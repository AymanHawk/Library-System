import { Webhook } from 'svix'
import { headers } from 'next/headers';
import {createUser, updateUser, deleteUser } from '../../../lib/actions/user'
import { createLibrary, deleteLibrary, updateLibrary } from '../../../lib/actions/library';

export async function POST(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  console.log('Webhook route hit');

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  // Do something with the payload
  const { id } = evt?.data;
  const eventType = evt?.type;

  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log('Webhook body:', body);

  //user events
  if (eventType === 'user.created') {
    const {id, image_url, username, first_name, last_name, email_addresses} = evt?.data;
    try{
      await createUser(id, image_url, username, first_name, last_name, email_addresses);

      return new Response('User is created', {status: 200});
    }catch(error){
      console.log('Error Creating user:', error)
      return new Response('Error Occured', {status: 400});
    }
  }

  if (eventType === 'user.updated') {
    const {id, image_url, username, first_name, last_name, email_addresses} = evt?.data;
    try{
      await updateUser(id, image_url, username, first_name, last_name, email_addresses);

      return new Response('User is updated', {status: 200});
    }catch(error){
      console.log('Error Updating user:', error)
      return new Response('Error Occured', {status: 400});
    }
  }

  if(eventType === 'user.deleted' ){
    const {id} = evt?.data;
    try {
      await deleteUser(id);
      return new Response('User is Deleted', {status: 200});
    }catch(error){
      console.log('Error Deleting user:', error)
      return new Response('Error Occured', {status: 400});
    }
  }


  //organization events
  if (eventType === 'organization.created') {
    const {id, logo_url, name} = evt?.data;
    try{
      await createLibrary(id, logo_url, name);

      return new Response('Library is created', {status: 200});
    }catch(error){
      console.log('Error Creating Library:', error)
      return new Response('Error Occured', {status: 400});
    }
  }

  if (eventType === 'organization.udated') {
    const {id, logo_url, name} = evt?.data;
    try{
      await updateLibrary(id, logo_url, name);

      return new Response('Library is created', {status: 200});
    }catch(error){
      console.log('Error Creating Library:', error)
      return new Response('Error Occured', {status: 400});
    }
  }

  if(eventType === 'organization.deleted' ){
    const {id} = evt?.data;
    try {
      await deleteLibrary(id);
      return new Response('Library is Deleted', {status: 200});
    }catch(error){
      console.log('Error Deleting Library:', error)
      return new Response('Error Occured', {status: 400});
    }
  }

  

  //handle adding a member to an organization
   //org membership events (add users to a library organization)

  if (eventType === 'organizationMembership.created') {
    const {organization, public_user_data, role } = evt?.data;
    const { user_id } = public_user_data;

    try {
        await updateLibrary(
            organization.id, 
            organization.logo_url,
            organization.name,
            { $push: { members: { userId: user_id, role } } } // Add new member along with role
        );
        return new Response('Organization member is added', { status: 200 });
    } catch (error) {
        console.log('Error adding organization member:', error);
        return new Response('Error Occurred', { status: 400 });
    }
}

if (eventType === 'organizationMembership.deleted') {
  const {organization, public_user_data } = evt?.data;
  const { user_id } = public_user_data;

  try {
      await updateLibrary(
          organization.id, 
          organization.logo_url,
          organization.name,
          { $pull: { members: { userId: user_id } } } 
      );
      
      return new Response('Organization member is removed', { status: 200 });
  } catch (error) {
      console.log('Error removing organization member:', error);
      return new Response('Error Occurred', { status: 400 });
  }
}

if (eventType === 'organizationMembership.updated') {
  const {organization, public_user_data, role } = evt?.data;
  const { user_id } = public_user_data;

  try {
      await updateLibrary(
          organization.id, 
          organization.logo_url,
          organization.name,
          {
              $set: {
                  'members.$[elem].role': role // Update the role of the member in the member array
              }
          },
          { arrayFilters: [{ 'elem.userId': user_id }] } // Filter to match the specific member
      );

      return new Response('Organization member role is updated', { status: 200 });
  } catch (error) {
      console.log('Error updating organization member role:', error);
      return new Response('Error Occurred', { status: 400 });
  }
}


 

  return new Response('', { status: 200 });
}
'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRouterContext } from '../../../../../utils/RouterContext';
import LibNavbar from '../../../../../components/LibNavbar';
import Papa from 'papaparse';
import { parseStringPromise } from 'xml2js';
import { read, utils, SSF } from 'xlsx'

function StockEdit() {

  const id = usePathname().split('/').pop();
  const router = useRouterContext();
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const handleRouterClick = (path) => {
    router.push(path);
  }



  const checkBooks = async () => {
    try {
      const query = encodeURIComponent(JSON.stringify(file));
      const res = await fetch(`/api/library/addMultiBookToLib?books=${query}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Error getting the user lib");
      }

      const data = await res.json();
      console.log(data);
      setResult(data.result);

    } catch (err) {
      console.log("Error getting books", err);
    }
  }

  const handleFileChange = async (event) => {
    const files = event.target.files[0];
    if (!files) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      const content = e.target.result;

      let booksData;

      if (files.type === 'application/json') {

        booksData = JSON.parse(content);
      } else if (files.type === 'text/csv') {

        booksData = Papa.parse(content, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
        }).data;
      } else if (files.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {

        const workbook = read(content, { type: 'binary', cellDates: true });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        booksData = utils.sheet_to_json(sheet, {
          raw: false,
        });
      } else if (files.type === 'text/xml' || files.type === 'application/xml') {

        try {
          let Data = await parseStringPromise(content, { mergeAttrs: true });
          booksData = Data.root.row;
        } catch (err) {
          console.error('Error parsing XML:', error);
          alert('Failed to parse XML file');
          return;
        }
      }
      else {
        alert('Unsupported file type');
        return;
      }
      setFile(booksData);
    };

    if (files.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      reader.readAsBinaryString(files);
    } else {
      reader.readAsText(files);
    }
  };

  const handleConfirm = async () => {
    try {
      let libId = id;
      const books = result;

      console.log(libId)

      const res = await fetch("/api/library/addMultiBookToLib", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          libId,
          books,
        }),
      })

      if (!res.ok) {
        console.error("Failed to update the inventory", res.statusText);
        return;
      }
  
      const data = await res.json();
      if (!data.success) {
        console.error("API response indicates failure to update the inventory");
        return;
      }
      console.log("done");

    } catch (err) {
      console.log("Error in adding multiple books:", err);
    }
  }


  return (
    <div>
      <LibNavbar libId={id} libPath={`/library/inventory/${id}`} />
      <div>
        <div>
          <h2>Book info</h2>
          <div className=' cursor-pointer'>
            <input type="file" name="csv" id="csv" onChange={handleFileChange} className='bg-secondary file:bg-secondary file:border-none file:cursor-pointer' />
          </div>
        </div>
      </div>
      <div className='flex gap-2'>
        <div className='border-primary border-[1px] cursor-pointer rounded-md' onClick={() => handleRouterClick(`/library/inventory/${id}`)}>
          back
        </div>
        <div className='bg-secondary' onClick={checkBooks}>
          Upload
        </div>
      </div>
      <hr />
      <div>
        <pre>{JSON.stringify(result, null, 2)}</pre>
        <button onClick={handleConfirm} className='bg-secondary'>Confirm</button>
      </div>
    </div>
  )
}

export default StockEdit
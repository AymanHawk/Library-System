import React from "react";

function Checkout() {
  return (
    <div className="flex flex-row flex-wrap justify-between m-6">
      <div className="border-secondary rounded-[5px] border-2 p-2 w-[48%] min-w-[300px] mb-6">
        <h1 className="text-[25px] text-primary mr-4 ml-4 mt-4 mb-2">Cart</h1>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-start">
            <div className="flex flex-row">
              <div className="mr-4 ml-4 mb-4 bg-white xl:w-[180px] xl:h-[220px] lg:w-[250px] lg:h-[350px] md:w-[260px] md:h-[350px] w-[200px] h-[300px]"></div>
              <div className="flex flex-col">
                <h2 className="text-primary text-[32px]">One Piece</h2>
                <h3 className="text-white text-[22px]">Eiichiro Oda</h3>
                <h4 className="text-white text-[22px]">Manga</h4>
              </div>
            </div>
            <input
              type="checkbox"
              className="m-2 w-6 h-6 appearance-none border-2 border-primary checked:bg-primary checked:before:content-['✓'] checked:before:text-black checked:before:block checked:before:text-center"
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col w-[48%] min-w-[300px] mb-6">
        <div className="border-secondary rounded-[5px] border-2 p-2 mb-6">
          <h1 className="text-[25px] text-primary mr-4 ml-4 mt-4 mb-2">Shipping Address</h1>
          <div>
            <input
              className="border-primary rounded-[2px] border-[1px] p-2 w-[95%] mb-2 mt-2 ml-4 mr-4 bg-transparent text-[15px]"
              type="text"
              placeholder="Name (Optional)"
            />
            <input
              className="border-primary rounded-[2px] border-[1px] p-2 w-[95%] mb-2 mt-2 ml-4 mr-4 bg-transparent text-[15px]"
              type="text"
              placeholder="Phone Number"
            />
            <input
              className="border-primary rounded-[2px] border-[1px] p-2 w-[95%] mb-2 mt-2 ml-4 mr-4 bg-transparent text-[15px]"
              type="text"
              placeholder="Street Address"
            />
            <input
              className="border-primary rounded-[2px] border-[1px] p-2 w-[95%] mb-4 mt-2 ml-4 mr-4 bg-transparent text-[15px]"
              type="text"
              placeholder="City and Zip Code"
            />
          </div>
        </div>
        
        <div className="border-secondary rounded-[5px] border-2 p-2 h-[65%]">
          <h1 className="text-[25px] text-primary mr-4 ml-4 mt-4 mb-2">Order Summary</h1>
          <div>
            <input
              className="border-primary rounded-[2px] border-[1px] p-2 w-[95%] mb-2 mt-2 ml-4 mr-4 bg-transparent text-[15px]"
              type="text"
              placeholder="Library"
            />
            <input
              className="border-primary rounded-[2px] border-[1px] p-2 w-[95%] mb-2 mt-2 ml-4 mr-4 bg-transparent text-[15px]"
              type="text"
              placeholder="Total Books"
            />
            <input
              className="border-primary rounded-[2px] border-[1px] p-2 w-[95%] mb-4 mt-2 ml-4 mr-4 bg-transparent text-[15px]"
              type="text"
              placeholder="Delivery Time"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

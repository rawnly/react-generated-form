import { NextPage } from 'next';
import React, { useState } from "react";

const Page: NextPage = ( _ ) => {
  const [counter, setCounter] = useState( 0 )

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ width: '100vw', height: '100vh' }}>
      <h1 className="text-primary">Counter: {counter}</h1>
      <div className="flex mt-2">
        <button onClick={() => setCounter( c => c + 1 )} className="btn btn-primary btn-rounded">Increment Counter</button>
        <button onClick={() => setCounter( c => c - 1 )} className="btn btn-danger btn-rounded">Decrement Counter</button>
      </div>
    </div>
  );
}

export default Page;

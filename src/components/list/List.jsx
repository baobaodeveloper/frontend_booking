import React from 'react';
import ListBrowse from './ListBrowse';
import ListHome from './ListHome';
import ListProp from './ListProp';

const List = () => {
  return (
    <div className='max-w-[1280px] flex flex-col mx-auto mt-14 px-4'>
      <ListProp />
      <ListBrowse />
      <ListHome />
    </div>
  );
};

export default List;

import React from 'react';

const items = [
  ['Countries', 'Rigions', 'Cities', 'Districts', 'Airposrt'],
  ['Home', 'Apartments', 'Resorts', 'Villas', 'Hostels'],
  [
    'Unique places to stay',
    'Reviews',
    'Unpacked:Travel articles',
    'Travel articles',
    'Travel articles',
  ],
  [
    'Car rental',
    'Flight Finder',
    'Restaurant reservations',
    'Travel Agents',
    'Travel Agents',
  ],
  [
    'Customer Service',
    'Partner Help',
    'Careers',
    'Sustainability',
    'Press center',
  ],
];
const FooterMenu = () => {
  return (
    <div className='max-w-[1280px] px-4 flex mx-auto'>
      <div className='grid md:grid-cols-5 w-full grid-cols-3 gap-x-4'>
        {items.map((menus, i) => (
          <div key={i}>
            {menus.map((menu, i) => (
              <div
                className='text-md font-serif mb-3 cursor-pointer xl:mt-0 mt-4'
                key={i}
              >
                {menu}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterMenu;

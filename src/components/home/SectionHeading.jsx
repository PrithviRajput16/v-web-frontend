import { useEffect, useState } from 'react';

import url_prefix from "../../data/variable";
import { useLanguage } from '../../hooks/useLanguage';


// export default function SectionHeading({ title, subtitle, description, center = false }) {
export default function SectionHeading({ title, subtitle='', description='', lang = 'EN', center = false }) {
  const [language] = useLanguage();

  const [headings, setHeadings] = useState({
    'heading': 'Not Available For Selected Language',
    'subheading': '',
    'description': ''
  });


  useEffect(() => {
    const fetchHeadings = async () => {
      const response = await fetch(url_prefix + `/api/headings/${title}/${language}`);
      const result = await response.json();
      if (result.success) {
        // if (result.data.length > 0) {
          console.log(result.data['home'])
          setHeadings(result.data['home'][0])

        // }
      }
    }
    fetchHeadings()
  }

  ), [language]


  return (
    <div className={`${center ? 'text-center' : ''} mb-12`}>
      <h2 className="text-3xl md:text-4xl font-bold text-darktext mb-4">
        {headings.heading}
      </h2>
      {headings.subheading && (
        <h3 className="text-xl md:text-2xl font-semibold text-primary mb-3">
          {headings.subheading}
        </h3>
      )}
      {headings.description && (
        <p className="text-lg text-lighttext max-w-3xl mx-auto">
          {headings.description}
        </p>
      )}
    </div>
  );
};


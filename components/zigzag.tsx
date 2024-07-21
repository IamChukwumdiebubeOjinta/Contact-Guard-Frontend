import Image from 'next/image'

import FeatImage01 from '@/public/images/sign-up-form-img.jpg'
import FeatImage02 from '@/public/images/add-contact-img.jpg'
import FeatImage03 from '@/public/images/access-manage-img.jpg'

const features = [
  {
    image: FeatImage01,
    imageAlt: "Features 01",
    title: "Sign Up",
    subtitle: "Create a free account in minutes",
    description: "Join Contact Guard effortlessly with our quick and easy sign-up process. Your secure journey begins here.",
    items: [
      "Easy sign-up process",
      "Ensured Security",
      "OAuth Avaliable",
    ],
    aos: "fade-up",
    contentAos: "fade-right",
    rtl: false,
  },
  {
    image: FeatImage02,
    imageAlt: "Features 02",
    title: "Add Contacts",
    subtitle: "Easily import or manually add your contact information.",
    description: "Whether you're importing a list or entering contacts manually, Contact Guard makes it simple and hassle-free.",
    items: [
      "Users can easily add contacts",
      "Fast and efficient",
      "Easy to use",
    ],
    aos: "fade-up",
    contentAos: "fade-left",
    rtl: true,
  },
  {
    image: FeatImage03,
    imageAlt: "Features 03",
    title: "Access & Manage",
    subtitle: "Access and manage your contacts anytime, from any device",
    description: "Enjoy the flexibility of managing your contacts from anywhere, at any time, with our user-friendly platform.",
    items: [
      "Manage your contacts from anywhere",
      "Access your contacts anytime",
      "Contacts are stored securely",
    ],
    aos: "fade-up",
    contentAos: "fade-right",
    rtl: false,
  },
];

export default function Zigzag() {
  return (
    <section>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="py-12 border-t border-gray-800 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl pb-12 mx-auto text-center md:pb-16">
            <div className="inline-flex px-3 py-1 m-2 mb-4 text-sm font-semibold text-green-600 bg-green-200 rounded-full">How It Works</div>
            <h1 className="mb-4 h2">Simple Steps to Secure Your Contacts</h1>
            <p className="text-xl text-gray-400"> Follow these easy steps to start using Contact Guard and keep your contact information safe and secure.</p>
          </div>

          {/* Items */}
          <div className="grid gap-20">
            {features.map((feature, index) => (
              <div key={index} className={`md:grid md:grid-cols-12 md:gap-6 items-center ${feature.rtl && 'rtl:order-last'}`}>
                {/* Image */}
                <div className={`max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 ${!feature.rtl && 'md:order-1'}`} data-aos={feature.aos}>
                  <Image className="h-auto max-w-full mx-auto rounded-sm md:max-w-none" src={feature.image} width={540} height={405} alt={feature.imageAlt} />
                </div>
                {/* Content */}
                <div className={`max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6`} data-aos={feature.contentAos}>
                  <div className={`${feature.rtl ? 'md:pl-4 lg:pl-12 xl:pl-16' : 'md:pr-4 lg:pr-12 xl:pr-16'}`}>
                    <div className="mb-2 text-xl text-[#5DADE2] font-architects-daughter">{feature.title}</div>
                    <h3 className="mb-3 h3">{feature.subtitle}</h3>
                    <p className="mb-4 text-lg text-gray-400">{feature.description}</p>
                    <ul className="-mb-2 text-base text-gray-400">
                      {feature.items.map((item, idx) => (
                        <li key={idx} className="flex items-center mb-2">
                          <svg className="w-3 h-3 mr-2 text-green-500 fill-current shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

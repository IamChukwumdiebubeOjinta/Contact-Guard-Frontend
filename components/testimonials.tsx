import Image from "next/image";

import TestimonialImage01 from "@/public/images/testimonial-01.jpg";
import TestimonialImage02 from "@/public/images/testimonial-02.jpg";
import TestimonialImage03 from "@/public/images/testimonial-03.jpg";

const testimonials = [
  {
    image: TestimonialImage01,
    alt: "Testimonial 01",
    quote:
      "Contact Guard has transformed how we store our customer information. We feel secure knowing our data is safe from breaches.",
    name: "Sarah L.",
    company: " Freelance Consultant",
  },
  {
    image: TestimonialImage02,
    alt: "Testimonial 02",
    quote:
      "I love the simplicity and security of Contact Guard. It's the perfect solution for managing my client contacts.",
    name: "John D.",
    company: " Small Business Owner",
  },
];

export default function Testimonials() {
  return (
    <section>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="py-12 border-t border-gray-800 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl pb-12 mx-auto text-center md:pb-20">
            <h2 className="mb-4 h2">Don't take our word for it</h2>
            <p className="text-lg text-gray-400">
              Here are what people have to say about our product.
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid items-start max-w-sm gap-8 mx-auto lg:grid-cols-2 lg:gap-6 lg:max-w-none">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col h-full p-6 bg-[#5DADE2] rounded-sm"
                data-aos="fade-up"
                data-aos-delay={`${index * 200}`}
              >
                <div>
                  <div className="relative inline-flex flex-col mb-4">
                    <Image
                      className="rounded-full"
                      src={testimonial.image}
                      width={48}
                      height={48}
                      alt={testimonial.alt}
                    />
                    <svg
                      className="absolute top-0 right-0 w-6 h-5 -mr-3 text-[#2C3E50] fill-current"
                      viewBox="0 0 24 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                    </svg>
                  </div>
                </div>
                <blockquote className="text-base text-justify grow">
                  {testimonial.quote}
                </blockquote>
                <div className="pt-5 mt-6 font-medium text-gray-700 border-t border-gray-700">
                  <cite className="not-italic text-gray-200">
                    {testimonial.name}
                  </cite>{" "}
                  -
                  <a
                    className="text-[#2C3E50] transition duration-150 ease-in-out hover:text-gray-200"
                    href="#0"
                  >
                    {testimonial.company}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

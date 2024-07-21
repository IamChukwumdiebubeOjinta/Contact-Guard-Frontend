import Footer from "@/components/ui/footer";

const ContactLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default ContactLayout;

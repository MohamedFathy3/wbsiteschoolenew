import { About1 } from "@/components/About";
import { Blog1 } from "@/components/Blog";
import { CallToAction1 } from "@/components/CallToAction";
import { Course3 } from "@/components/Course";
import { Features1 } from "@/components/Features";
import PageBanner from "@/components/PageBanner";
import { Partner2 } from "@/components/Partner";
import EdunaLayout from "@/layout/EdunaLayout";
const page = () => {
  return (
    <EdunaLayout>
      <PageBanner pageTitleEn="About Us"
       pageTitleAr="من نحن"

       />
      <About1 />
      <Features1 />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </EdunaLayout>
  );
};
export default page;

import { CallToAction1 } from "@/components/CallToAction";
import { Course3 } from "@/components/Course";
import PageBanner from "@/components/PageBanner";
import EdunaLayout from "@/layout/EdunaLayout";
const page = () => {
  return (
    <EdunaLayout>
      <PageBanner   pageTitleEn="Courses"
  pageTitleAr="الدروس" 
  />
      <Course3 />
    </EdunaLayout>
  );
};
export default page;

import { Blog2 } from "@/components/Blog";
import PageBanner from "@/components/PageBanner";
import EdunaLayout from "@/layout/EdunaLayout";
const page = () => {
  return (
    <EdunaLayout>
      <PageBanner pageTitleEn="Latest Blog & News" />
      <Blog2 />
    </EdunaLayout>
  );
};
export default page;

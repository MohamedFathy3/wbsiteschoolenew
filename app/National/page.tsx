import EdunaLayout from "@/layout/EdunaLayout";
import FreeResources from "@/components/NationalIdentity";
import PageBanner from "@/components/PageBanner";
import { CallToAction1 } from "@/components/CallToAction";

const FreeResourcesPage = () => {
  
  return (
    <EdunaLayout>
      <PageBanner pageTitleEn="Our National"
      pageTitleAr=" الهوية الوطنية"
      />
      
      <FreeResources/>
      
   
    </EdunaLayout>
  );
};

export default FreeResourcesPage;
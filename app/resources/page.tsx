import EdunaLayout from "@/layout/EdunaLayout";
import FreeResources from "@/components/resources";
import PageBanner from "@/components/PageBanner";
import { CallToAction1 } from "@/components/CallToAction";

const FreeResourcesPage = () => {
  
  return (
    <EdunaLayout>
     
            <PageBanner pageTitleEn="Our Resources" pageTitleAr="مصادر مجانية" />

      <FreeResources/>
  
    </EdunaLayout>
  );
};

export default FreeResourcesPage;
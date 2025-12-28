"use client";
import ImageView from "@/components/ImageView";
import ScrollTop from "@/components/ScrollTop";
import VideoPopup from "@/components/VideoPopup";
import { eduna_config } from "@/utilities";
import { LanguageProvider } from "@/context/LanguageContext";
import { Fragment, useEffect } from "react";
// @ts-ignore
import niceSelect from "react-nice-select";
import Footer from "./Footer";
import Header from "./Header";
const EdunaLayout = ({
  children,
  header,
  footer,
}: {
  children: React.ReactNode;
  header?: number | 1;
  footer?: number | 1;
}) => {
  useEffect(() => {
    eduna_config.animation();
    eduna_config.movie_animation();
    eduna_config.smooth_scroll();
    eduna_config.scroll_animation();
    niceSelect();
  }, []);
  return (
    <Fragment>
      <VideoPopup />
      <ImageView />
        <LanguageProvider>
      <Header header={header ?? 1} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>{children}</main>
          <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
          <Footer footer={footer ?? 1} />
        </div>
      </div>
      </LanguageProvider>
      <ScrollTop />
    </Fragment>
  );
};
export default EdunaLayout;

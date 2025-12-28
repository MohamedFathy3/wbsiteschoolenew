"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { useCurriculum } from "@/context/CurriculumContext";

export const Category1 = ({
  pt = "pt-0",
}: {
  pt?: string;
}) => {
  const { lang } = useLang();
  const { curriculums, loading, error } = useCurriculum();

  const isAr = lang === "ar";
  const safeCurriculums = curriculums || [];

  return (
    <section className={`ed-category section-gap ${pt}`}>
      <div className="container ed-container">

        {/* ===== Section Title ===== */}
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12 text-center">
            <div
              className="ed-section-head"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                marginBottom: "40px",
              }}
            >
              <h3 className="ed-section-head__title m-0">
                {isAr
                  ? "كل المناهج التعليمية بين يديك"
                  : "All Educational Curriculums at Your Fingertips"}
              </h3>

              <Link href="/curriculums" className="ed-btn">
                {isAr ? "استعرض المناهج" : "Browse Curriculums"}
                <i
                  className="fi fi-rr-arrow-small-right"
                  style={{
                    transform: isAr ? "scaleX(-1)" : "none",
                    marginInlineStart: "8px",
                  }}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* ===== Loading ===== */}
        {loading && (
          <div className="row">
            <div className="col-12">
              <div className="ed-category__wrapper">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div className="ed-category__card skeleton-card" key={item}>
                    <div className="skeleton-icon"></div>
                    <div className="skeleton-text"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== Error ===== */}
        {error && (
          <div className="row">
            <div className="col-12 text-center">
              <div className="alert alert-danger">
                {isAr
                  ? "حدث خطأ أثناء تحميل المناهج"
                  : "An error occurred while loading curriculums"}
              </div>
            </div>
          </div>
        )}

        {/* ===== Content ===== */}
        {!loading && !error && (
          <div className="row">
            <div className="col-12">
              {safeCurriculums.length === 0 ? (
                <p className="text-center text-muted py-5">
                  {isAr
                    ? "لا توجد مناهج متاحة حاليًا"
                    : "No curriculums available at the moment"}
                </p>
              ) : (
                <div className="ed-category__wrapper">
                  {safeCurriculums.slice(0, 8).map((curriculum) => (
                    <Link
                      key={curriculum.id}
                      href={`/curriculums/${curriculum.id}/stages`}
                      className="ed-category__card"
                      style={{
                        textAlign: "center",
                        direction: isAr ? "rtl" : "ltr",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={curriculum.image}
                        alt={curriculum.name}
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginBottom: "10px",
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/assets/images/default-curriculum.svg";
                        }}
                      />

                      <h6
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          marginBottom: "4px",
                        }}
                      >
                        {curriculum.name}
                      </h6>

                  
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

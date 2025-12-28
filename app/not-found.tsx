import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <main>
      <section className="ed-error section-gap">
        <div className="container ed-container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-8 col-12">
              <div className="ed-error__inner text-center">
                <div className="ed-error__img">
                  <Image
                    src="/assets/images/error-img.svg"
                    alt="error-img"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="ed-error__content">
                  <p className="ed-error__content-text">
                    Seems like you've landed on a page which has been archived
                    or removed, let's take you back home?
                  </p>
                  <div className="ed-error__btn">
                    <Link href="/" className="ed-btn">
                      Go to Homepage
                      <i className="fi fi-rr-arrow-small-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default NotFound;

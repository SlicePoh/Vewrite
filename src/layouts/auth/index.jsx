import authImg from "assets/img/auth/auth-banner.jpg";
import { Outlet } from "react-router-dom";

export default function Auth() {
  document.documentElement.dir = "ltr";
  return (
    <div>
      <div className=" h-full min-h-screen w-full !bg-white dark:!bg-darkbg">
        <main className={`mx-auto min-h-screen`}>
    
            <div className="mx-auto flex min-h-full w-full flex-col ">
              
                <div className="h-full">
                  <Outlet />
                </div>

                {/* <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
                  <div
                    className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                    style={{ backgroundImage: `url(${authImg})` }}
                  />
                </div> */}
              
            </div>
    
        </main>
      </div>
    </div>
  );
}

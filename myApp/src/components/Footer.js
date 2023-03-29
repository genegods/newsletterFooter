import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";


const Footer = () => {
  // handle events
  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  // handle notification
  const [notification, setNotification] = useState(true);

  // handle submit
  const onSubmit = (data) => {
    console.log('data', data);
    setNotification(true)
    reset()
  }

  // handle timer for notification
  useEffect(() =>{
    let timer;
    if(notification){
      timer = setTimeout(() =>{
        setNotification(false)
      }, 10000)
    }
    return () =>clearTimeout(timer)
  },[notification])
  return (
    <React.Fragment>
      <main>
        <div className="h-screen bg-black flex items-end">
          <div className="h-60 bg-white w-full centered flex-col space-y-4">
            <p className="capitalize text-center font-semibold text-3xl">
              Join our Newsletter
            </p>
            {notification && (
              <div className='bg-green-500 h-10 text-white w-full centered'>
                <p>Thanks for Subscribing!!!</p>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                {/* body */}
                <div className="flex">
                  <div>
                    <input
                      type="email"
                      autoComplete="off"
                      placeholder="Enter your email"
                      className='h-10 w-48 rounded-l md:w-60 '
                      {...register("email", {
                        required: false,
                        pattern: {
                          value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                          message: "Please enter a valid email",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("email");
                      }}
                    />
                
                  </div>
                  

                  {/* btn section */}
                  <div className="flex items-center justify-center">
                    <input
                      type="submit"
                      value="Subscribe"
                      className="h-10 px-2 rounded-r bg-red-800 text-white font-bold  "
                    />
                  </div>
                </div>
                {errors.email && (
                      <span className="text-sm text-red-500">
                        {errors.email.message}
                      </span>
                    )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Footer;

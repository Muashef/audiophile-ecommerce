"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Modal from "react-modal";
import Loading from "@/components/loading";

function NavigationEvents() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    setLoading(true);
    if (url) {
      setLoading(false);
    }
    // console.log(url);
    // You can now use the current URL
    // ...
  }, [pathname, searchParams]);

  return (
    <Modal
      // appElement={document.getElementById("root") || undefined}
      isOpen={loading}
      //   className="modal"
      overlayClassName="backdrop"
      onRequestClose={() => setLoading(false)}
    >
      <Loading />
    </Modal>
  );
}

export default NavigationEvents;
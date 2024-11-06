import "./bootstrap";
import "../sass/app.scss";

import { createRoot, hydrateRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Toaster } from "react-hot-toast";
import axios from "axios";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx")
    ),
  setup({ el, App, props }) {
    // Global CSRF setup
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["X-CSRF-TOKEN"] =
      props.initialPage.props.csrf_token;
    // console.log(props.initialPage.props.csrf_token);
    // axios.defaults.headers.common["X-CSRF-TOKEN"] = document.querySelector(
    //   'meta[name="csrf-token"]'
    // )?.content;
    // axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    // axios.defaults.withCredentials = true;

    if (import.meta.env.DEV) {
      createRoot(el).render(
        <>
          <App {...props} />
          <Toaster />
        </>
      );
      return;
    }

    hydrateRoot(el, <App {...props} />);
  },
  progress: {
    color: "#4B5563",
    showSpinner: false,
  },
});

/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { remote } from "electron";
import Button from "../misc/Button";
import { reduxAction } from "../../../shared/redux/sharedRedux";
import store, { AppState } from "../../../shared/redux/stores/rendererStore";
import { useSelector } from "react-redux";
import css from "./Sections.css";
import { constants } from "mtgatool-shared";
const { IPC_BACKGROUND } = constants;

function click(): void {
  const clearAppSettings = {
    rememberMe: false,
    autoLogin: false,
    launchToTray: false,
  };
  reduxAction(
    store.dispatch,
    { type: "SET_APP_SETTINGS", arg: clearAppSettings },
    IPC_BACKGROUND
  );
  setTimeout(() => {
    remote.app.relaunch();
    remote.app.exit(0);
  }, 1000);
}

export default function SectionLogin(): JSX.Element {
  const offline = useSelector((state: AppState) => state.renderer.offline);
  return (
    <div className={css.about}>
      <Button text={offline ? "Login" : "Logout"} onClick={click} />
    </div>
  );
}

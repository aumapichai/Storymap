import { createContext, useState } from "react";

interface IValMockContext {
  stateIcon: Boolean;
  showDialog: Boolean;
  typeDialog: String;
  idDialog: Number;
  indexDialogFish: Number;
  indexDialogFarming: Number;
  indexDialogMain: Number;
  clickActive: String;
  locationPageMain: any;
}

interface IMockContext {
  val: IValMockContext | null;
  setVal: Function;
}

export const MockContext = createContext<IMockContext>({
  val: null,
  setVal: () => {},
});

export const MockContextConsumer = MockContext.Consumer;

export const MockContextProvider = (props: any) => {
  const [val, setVal] = useState<IValMockContext | null>(null);

  return (
    <MockContext.Provider value={{ val, setVal }}>
      {props.children}
    </MockContext.Provider>
  );
};

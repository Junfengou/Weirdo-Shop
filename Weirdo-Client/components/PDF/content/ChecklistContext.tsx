import {
    GetChecklistDto,
    GetChecklistResponseDateDto,
    GetChecklistResponseFrequencyProficiencyDto,
    GetChecklistSectionDto,
    UpdateChecklistResponseTextDto
  } from './types/dataType';
  import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useMemo,
    useState
  } from 'react';
  
  interface ChecklistContextProviderProps extends PropsWithChildren {
    checklist: GetChecklistDto;
    checklistQuestions: GetChecklistSectionDto[];
  }
  
  export interface ChecklistContextType {
    changeDetected: boolean | null;
    updateChangeDetected: Dispatch<SetStateAction<boolean>>;
    userSliderResponsesList: GetChecklistResponseFrequencyProficiencyDto[] | null;
    setUserSliderResponsesList: Dispatch<
      SetStateAction<GetChecklistResponseFrequencyProficiencyDto[]>
    >;
    userDateResponsesList: GetChecklistResponseDateDto[] | null;
    setUserDateResponsesList: Dispatch<
      SetStateAction<GetChecklistResponseDateDto[]>
    >;
    userTextResponsesList: UpdateChecklistResponseTextDto[] | null;
    setUserTextResponsesList: Dispatch<
      SetStateAction<UpdateChecklistResponseTextDto[]>
    >;
    overallCompletionPercentage: number | null; 
    setOverallCompletionPercentage: Dispatch<SetStateAction<number>>;
    formChangedStatus: boolean | null;
    setFormChangedStatus: Dispatch<SetStateAction<boolean>>;
    renderModal: boolean | null;
    setRenderModal: Dispatch<SetStateAction<boolean>>;
    checklistId: number | null;
    signature: string | null;
    setSignature: Dispatch<SetStateAction<string>>;
  }
  
  // Use on the component level
  const initialChecklistContext: Partial<ChecklistContextType> = {
    changeDetected: null,
    updateChangeDetected: () => {},
    userSliderResponsesList: null,
    setUserSliderResponsesList: () => {},
    userDateResponsesList: null,
    setUserDateResponsesList: () => {},
    userTextResponsesList: null,
    setUserTextResponsesList: () => {},
    overallCompletionPercentage: null,
    setOverallCompletionPercentage: () => {},
    formChangedStatus: null,
    setFormChangedStatus: () => {},
    renderModal: null,
    setRenderModal: () => {},
    checklistId: null,
    signature: null,
    setSignature: () => {}
  };
  
  export const ChecklistContext = createContext(initialChecklistContext);
  
  export const ChecklistContextProvider: React.FC<
    ChecklistContextProviderProps
  > = ({ checklist, children }) => {
    const [changeDetected, updateChangeDetected] = useState<boolean>(false);
  
    const [userSliderResponsesList, setUserSliderResponsesList] = useState<
      GetChecklistResponseFrequencyProficiencyDto[]
    >(checklist.checklistResponseFrequencyProficiencies);
  
    const [userDateResponsesList, setUserDateResponsesList] = useState<
      GetChecklistResponseDateDto[]
    >(checklist.checklistResponseDates);
  
    const [userTextResponsesList, setUserTextResponsesList] = useState<
      UpdateChecklistResponseTextDto[]
    >(checklist.checklistResponseTexts);
  
    const [overallCompletionPercentage, setOverallCompletionPercentage] =
      useState<number>(checklist?.completionPercentage != null ? checklist?.completionPercentage : 0);
  
    const [formChangedStatus, setFormChangedStatus] = useState<boolean>(false);
  
    const [renderModal, setRenderModal] = useState<boolean>(false);
  
    const [checklistId, _] = useState<number>(checklist.id != null ? checklist.id : 0);
    const [signature, setSignature] = useState<string>(checklist.signature != null ? checklist.signature : '');
  
    const value = useMemo(
      () => ({
        changeDetected,
        updateChangeDetected,
        userSliderResponsesList,
        setUserSliderResponsesList,
        userDateResponsesList,
        setUserDateResponsesList,
        userTextResponsesList,
        setUserTextResponsesList,
        overallCompletionPercentage,
        setOverallCompletionPercentage,
        formChangedStatus,
        setFormChangedStatus,
        renderModal,
        setRenderModal,
        checklistId,
        signature,
        setSignature
      }),
      [
        changeDetected,
        updateChangeDetected,
        userSliderResponsesList,
        userDateResponsesList,
        userTextResponsesList,
        overallCompletionPercentage,
        formChangedStatus,
        renderModal,
        checklistId,
        signature
      ]
    );
    return (
      <ChecklistContext.Provider value={value}>
        {children}
      </ChecklistContext.Provider>
    );
  };
  
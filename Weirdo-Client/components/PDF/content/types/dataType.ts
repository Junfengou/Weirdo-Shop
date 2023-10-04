export type GetChecklistDto = {
    id?: number;
    createdOn?: string;
    modifiedOn?: string;
    createdByName?: string | null;
    modifiedByName?: string | null;
    travelerId?: number;
    checklistTemplateId?: number;
    completionPercentage?: number;
    signature?: string | null;
    expiresOn?: string;
    completedOn?: string;
    checklistTemplate?: any;
    checklistResponseDates?:any | null;
    checklistResponseTexts?: any | null;
    checklistResponseFrequencyProficiencies?: any | null;
};

export type GetChecklistResponseDateDto = {
    id?: number;
    createdOn?: string;
    modifiedOn?: string;
    createdByName?: string | null;
    modifiedByName?: string | null;
    checklistId?: number;
    checklistQuestionId?: number;
    response?: string;
};

export type GetChecklistResponseFrequencyProficiencyDto = {
    id?: number;
    createdOn?: string;
    modifiedOn?: string;
    createdByName?: string | null;
    modifiedByName?: string | null;
    checklistId?: number;
    checklistQuestionId?: number;
    proficiencyResponse?: number;
    frequencyResponse?: number;
};


export type GetChecklistSectionDto = {
    id?: number;
    createdOn?: string;
    modifiedOn?: string;
    createdByName?: string | null;
    modifiedByName?: string | null;
    name?: string | null;
    checklistParentSectionId?: number | null;
    checklistQuestions?: GetChecklistQuestionDto[]| null;
};

export type UpdateChecklistResponseTextDto = {
    id?: number;
    createdOn?: string;
    modifiedOn?: string;
    createdByName?: string | null;
    modifiedByName?: string | null;
    checklistQuestionId?: number;
    response?: string | null;
};

export enum QuestionType {
    DateBased = 3,
    TextBased = 4,
    ProficiencyBased = 5
  }

  export interface NestedCheckList extends GetChecklistSectionDto {
    child?: Array<GetChecklistSectionDto>;
  }
  

export type UpdateChecklistResponseFrequencyProficiencyDto = {
    checklistQuestionId?: number;
    proficiencyResponse?: number;
    frequencyResponse?: number;
};

export type UpdateChecklistResponseDateDto = {
    id?: number;
    createdOn?: string;
    modifiedOn?: string;
    createdByName?: string | null;
    modifiedByName?: string | null;
    checklistQuestionId?: number;
    response?: string;
};

export type GetChecklistQuestionDto = {
    id?: number;
    createdOn?: string;
    modifiedOn?: string;
    createdByName?: string | null;
    modifiedByName?: string | null;
    displayText?: string | null;
    checklistQuestionType?: ChecklistQuestionType;
};

export interface ChecklistQuestionType {
    name: string,
    isDate: boolean,
    isText: boolean,
    isNumber: boolean,
    isRadio: boolean,
    id: number,
    createdOn?: string;
    modifiedOn?: string;
    createdByName?: string | null;
    modifiedByName?: string | null;
  }
  
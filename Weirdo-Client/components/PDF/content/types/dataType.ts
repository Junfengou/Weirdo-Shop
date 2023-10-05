export type GetChecklistDto = {
    id?: number;
    createdOn?: string;
    modifiedOn?: string;
    createdByName?: string;
    modifiedByName?: string;
    travelerId?: number;
    checklistTemplateId?: number;
    completionPercentage?: number;
    signature?: string;
    expiresOn?: string;
    completedOn?: string;
    checklistTemplate?: any;
    checklistResponseDates?:any;
    checklistResponseTexts?: any;
    checklistResponseFrequencyProficiencies?: any;
};

export type GetChecklistResponseDateDto = {
    id?: number;
    createdOn?: string;
    modifiedOn?: string;
    createdByName?: string;
    modifiedByName?: string;
    checklistId?: number;
    checklistQuestionId?: number;
    response?: string;
};

export type GetChecklistResponseFrequencyProficiencyDto = {
    id?: number;
    createdOn?: string;
    modifiedOn?: string;
    createdByName?: string;
    modifiedByName?: string;
    checklistId?: number;
    checklistQuestionId?: number;
    proficiencyResponse?: number;
    frequencyResponse?: number;
};


export type GetChecklistSectionDto = {
    id?: number;
    createdOn?: string;
    modifiedOn?: string;
    createdByName?: string;
    modifiedByName?: string;
    name?: string;
    checklistParentSectionId?: number | null;
    checklistQuestions?: GetChecklistQuestionDto[];
};

export type UpdateChecklistResponseTextDto = {
    id?: number;
    createdOn?: string;
    modifiedOn?: string;
    createdByName?: string;
    modifiedByName?: string;
    checklistQuestionId?: number;
    response?: string;
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
    createdByName?: string;
    modifiedByName?: string;
    checklistQuestionId?: number;
    response?: string;
};

export type GetChecklistQuestionDto = {
    id?: number;
    createdOn?: string;
    modifiedOn?: string;
    createdByName?: string;
    modifiedByName?: string;
    displayText?: string;
    textAnswer?: string;
    proficiencyAnswer?: number;
    frequencyAnswer?: number;
    dateAnswer?: string;
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
    createdByName?: string;
    modifiedByName?: string;
  }
  
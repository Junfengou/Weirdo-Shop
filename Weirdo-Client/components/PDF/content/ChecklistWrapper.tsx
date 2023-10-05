
import { Accordion, AccordionDetails, AccordionSummary, Grid, Slider, Stack, TextField, Typography, styled } from '@mui/material';
import { FC } from 'react';
import { PDFViewer } from "@react-pdf/renderer"
import { checklistQuestions, removeAlphabeticalPrefix } from '../data';
  
enum QuestionType {
  Slider = "Proficiency Frequency Question Type",
  Text = "Text Question Type"
}

  const ChecklistWrapper = () => {
    return (
        <Grid sx={{padding: 5}}>
        {
          checklistQuestions.map(item => {
            return (
              <Accordion sx={{
                // border: 'solid 2px red',
                width: '50rem',
                marginBottom: 2
                }}>
                <AccordionSummary
                  expandIcon={<></>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    // border: 'solid 2px blue',
                    backgroundColor: 'gray',
                    opacity: 0.9
                  }}
                >
                  <Typography>{removeAlphabeticalPrefix(item.name) }</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {item?.checklistQuestions != null && item.checklistQuestions.map(question => {
                      return (
                        <ContentWrapper>
                          <Grid sx={{marginBottom: 5}}> 
                            <SkillsChecklistTitle>{removeAlphabeticalPrefix(question.displayText)}</SkillsChecklistTitle>
                          </Grid>

                          {
                            question?.checklistQuestionType?.name == QuestionType.Text
                            ? (
                            <Grid>
                              <TextField id="outlined-basic" label="stuff" variant="outlined" />
                            </Grid>
                            )
                            : (
                              <Grid sx={{
                                // border: 'solid 2px blue',
                                width: '50%'
                              }}>
                                <Slider
                                aria-label="Small steps"
                                defaultValue={1}
                                step={1}
                                marks
                                min={1}
                                max={4}
                                valueLabelDisplay="auto"
                              />
                              </Grid>
                            )
                          }
                        </ContentWrapper>
                      )
                    })}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )
          })
        }
      </Grid>
    );
  };
  
  export default ChecklistWrapper;
  
  const PageTitle = styled(Stack)(
    () => `
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-between;
        align-self: stretch;
        padding: 8px;
    `
  );
  
  const SkillsChecklistTitleStack = styled(Stack)(
    () => `
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: flex-start;
    `
  );
  
  const SkillsChecklistBackBtn = styled(Grid)(
    ({ theme }) => `
        padding-right: 16px;
        fontSize: large;
    `
  );
  
  const SkillsChecklistTitle = styled(Typography)(
    ({ theme }) => `
        display: flex;
        font-family: Open sans;
        font-weight: 300;
        font-size: 18px;
    `
  );
  
  export const ContentWrapper = styled(Grid)(() => ({
    // border: 'solid 2px blue',
    // height: '100vh',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
}));
import "../less/task.less"
import { ITask } from "../types/types";
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from "@mui/material";
import { FC } from "react";


const Task: FC<ITask> = ({checked, label}) => {

  return (
    <div className='task'>
        <FormControlLabel  sx={{ '& .MuiTypography-root': { fontSize: 25 } }} label={label} control={<Checkbox checked={checked} sx={{ '& .MuiSvgIcon-root': { fontSize: 33 } }} />}/>
    </div>
  )
}

export default Task
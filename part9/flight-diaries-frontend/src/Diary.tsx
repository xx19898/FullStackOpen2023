import { Diary } from "./service";
import React from 'react';

const DiaryComp = ({date,visibility,weather}:Diary) => {

    return(
        <div className="diary-main">
            <p className="diary-cell">Date</p><p className="diary-cell" style={{fontWeight:600}}>{date.toString()}</p>
            <p className="diary-cell">Weather</p><p className="diary-cell" style={{fontWeight:600}}>{weather}</p>
            <p className="diary-cell">Visibility</p><p className="diary-cell" style={{fontWeight:600}}>{visibility}</p>
        </div>
    )
}

export default DiaryComp;
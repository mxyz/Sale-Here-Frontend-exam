import React, { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Typography, { TYPOGRAPHY_TYPES } from '../../components/Typography';
import Button from '../../components/Button';

const LandingController = () => {
    const { userName } = useParams();
    const navigator = useNavigate();

    useEffect(()=>{
        if(!userName) {
            navigator('/');
        }
    },[navigator, userName])

    const onClickCreateRoom = useCallback(()=>{
        navigator(`/user/${userName}/create`);
    },[navigator, userName])
    const onClickJoinRoom = useCallback(()=>{
        navigator(`/user/${userName}/join`);
    },[navigator, userName])

    return <div className="w-full flex flex-col items-center py-16 space-y-16">
        <Typography typography={TYPOGRAPHY_TYPES.TITLE}>คุณ {userName}</Typography>
        <section className="flex flex-col space-y-4" id="buttons-section">
            <Button className="px-16" onClick={onClickCreateRoom}>สร้างห้องใหม่</Button>
            <Button className="px-16" onClick={onClickJoinRoom} outline>เข้าร่วมแชท</Button>
        </section>
    </div>
}

export default LandingController
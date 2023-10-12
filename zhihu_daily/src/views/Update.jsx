import React, {useState} from 'react'
import styled from "styled-components";
import ButtonAgain from "../components/ButtonAgain";
import {ImageUploader, Input, Toast} from "antd-mobile";
import NavBarAgain from "../components/NavBarAgain";
import {connect} from "react-redux";
import action from "../store/action";
import api from "../api";
const UpdateBox = styled.div`
    .formBox {
        padding: 30px;

        .item {
            display: flex;
            align-items: center;
            height: 110px;
            line-height: 110px;
            font-size: 28px;
            margin-bottom: 14px;

            .label {
                width: 20%;
                text-align: center;
            }

            .input {
                width: 80%;
                .adm-image-uploader-cell{
                    height: 110px;
                    width: 110px;
                }
                .adm-image-uploader-cell-image{
                    height: inherit;
                    width: inherit;
                }
                .adm-image-uploader-upload-button-icon{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 40px;
                }
            }
        }
    }

    .submit {
        display: block;
        margin: 0 auto;
        width: 60%;
        height: 70px;
        font-size: 28px;
    }
`;
const Update = (props) => {
    let {info, queryUserInfoAsync, navigate} = props;
    let [pic, setPic] = useState([{
        url: info.pic
    }]),
        [username, setUserName] = useState(info.name);
    
    // 图片上传
    const limitImage = (file) => {
        let limit = 1024 * 1024;
        if (file.size > limit) {
            Toast.show({
                icon: 'fail',
                content: '图片大小不得超过1MB'
            });
            return null;
        }
        return file;
    };
    const uploadImage = async (file) => {
        let tempPic;
        try {
            let {code, pic} = await api.upload(file);
            if (+code !== 0){
                Toast.show({
                    icon: 'fail',
                    content: '上传失败'
                });
                return;
            }
            tempPic = pic;
            setPic([{
                url: pic
            }])
        }catch (e) {}
        return {url: tempPic}
    };
    // 提交信息
    const submit = async () => {
        if (pic.length === 0){
            Toast.show({
                icon: 'fail',
                content: '请先上传图片'
            })
            return;
        }
        if (username.trim() === ''){
            Toast.show({
                icon: 'fail',
                content: '请先输入名字'
            })
            return;
        }
        let [{url}] = pic;
        try {
            let {code} = await api.userUpdate(username.trim(), url);
            if (+code !== 0){
                Toast.show({
                    icon: 'fail',
                    content: '修改信息失败'
                });
                return;
            }
            Toast.show({
                icon: 'success',
                content: '修改信息成功'
            });
            // 同步 redux 中的信息
            queryUserInfoAsync();
            navigate(-1);
        }catch (e) {}
    };
    
    return (
        <UpdateBox>
            <NavBarAgain title="修改信息" />
            <div className="formBox">
                <div className="item">
                    <div className="label">头像</div>
                    <div className="input">
                        <ImageUploader
                            accept='image/jpg, image/jpeg, image/png'
                            maxCount={1}
                            value={pic}
                            beforeUpload={limitImage}
                            upload={uploadImage}
                            onDelete={() => {
                                setPic([])
                            }}
                        />
                    </div>
                </div>
                <div className="item">
                    <div className="label">姓名</div>
                    <div className="input">
                        <Input placeholder='请输入账号名称'
                               value={username}
                               onChange={val => {
                                   setUserName(val);
                               }} />
                    </div>
                </div>
                <ButtonAgain color='primary' className="submit"
                             onClick={submit}>
                    提交
                </ButtonAgain>
            </div>
        </UpdateBox>
    )
}
export default connect(
    state => state.base,
    action.base
)(Update);
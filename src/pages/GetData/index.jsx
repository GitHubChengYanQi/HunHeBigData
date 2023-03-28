import React from "react";
import {Button, Input, List} from "antd";
import useRequest from "../../util/Request/useRequest";

const list = {
    url: '/bzfy/inhospitalBase/list',
    method: "POST"
}

const GetData = () => {

    const {loading,data} = useRequest(list, {
        // manual: true
    })
    console.log(data)
    // const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]

    return <div>
        <Input placeholder='请输入病案号'/>
        <div style={{padding: '24px 0 24px 24px', maxHeight: 'calc(100vh - 120px)', overflow: 'auto', marginTop: 16}}>
            <List
                dataSource={data || []}
                renderItem={(item) => (
                    <List.Item
                        actions={[<Button type="link" onClick={() => {
                            const data = {
                                I2:item.age,
                                C3:item.ageMonth,
                                I3:item.birthPlace,
                                G2:item.birthday,
                                K6:item.contactAddress,
                                C7:item.contactPhone,
                                I6:item.contactRelationship,
                                G6:item.contactsName,
                                K4:item.currentAddress,
                                E5:item.currentZipCode,
                                G9:item.diagnose,
                                E1:item.healthCard,
                                G7:item.hospitalizationDate,
                                K7:item.hospitalizationDepartment,
                                I7:item.hospitalizationHour,
                                E9:item.hospitalizationLength,
                                E7:item.hospitalizationMethod,
                                C8:item.hospitalizationRoom,
                                G1:item.hospitalizationsNumber,
                                E4:item.idCard,
                                // C1:item.inHospitalId,
                                G8:item.leaveDate,
                                K8:item.leaveDepartment,
                                I8:item.leaveHour,
                                C9:item.leaveRoom,
                                I4:item.marriage,
                                C1:item.medicalPayment,
                                I1:item.medicalRecordNumber,
                                C2:item.name,
                                C4:item.nation,
                                K2:item.nationality,
                                K3:item.nativePlace,
                                E3:item.newbornBirthWeight,
                                G4:item.occupation,
                                // C1:item.patientId,
                                C5:item.phone,
                                K5:item.placeOfWork,
                                E6:item.placeOfWorkZipCode, // *
                                G5:item.registeredAddress,
                                I5:item.registeredZipCode,
                                E2:item.sex,
                                E8:item.transferDepartment,
                                C6:item.workPhone,
                            }
                            // window.open('https://baidu.com')
                            window.electronAPI.LoadData(JSON.stringify([data]))
                        }}>
                            获取数据
                        </Button>]}
                    >
                        <List.Item.Meta
                            title={item.medicalRecordNumber}
                            description={item.name}
                        />
                    </List.Item>
                )}
            />
        </div>

    </div>
};

export default GetData

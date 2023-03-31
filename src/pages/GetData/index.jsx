import React, {useEffect, useState} from "react";
import {Button, DatePicker, Divider, Input, List, message, Modal, Spin} from "antd";
import useRequest from "../../util/Request/useRequest";
import moment from "moment";
import {anesthesiaType} from "./switch";
import styles from './index.less'
import SearchValueFormat from "./components/SearchValueFormat";
import InfiniteScroll from 'react-infinite-scroll-component';
import locale from 'antd/es/date-picker/locale/zh_CN'

const listUrl = {
    url: '/bzfy/inhospitalBase/list',
    method: "GET"
}

const detailUrl = {
    url: '/bzfy/inhospitalBase/detail',
    method: "GET"
}

const GetData = () => {

    const [page, setPage] = useState(1)

    const [searchValue, setSearchValue] = useState('')

    const [data, setData] = useState([])

    const [hasMore, setHasMore] = useState(true)

    const {loading, run} = useRequest(listUrl, {
        onSuccess: (res) => {
            setPage(page + 1)
            setData([...data, ...res])
            setHasMore(res.length >= 20);
        }
    })

    const postData = (res) => {
        const item = res || {}

        const costGather = res.costGatherResult || {}

        const costGatherData = {
            D43: costGather.totalCost,
            F44: costGather.generalTreatmentOperation,
            H44: costGather.nurse,
            K44: costGather.other,
            D45: costGather.pathologicDiagnosis,
            F45: costGather.laboratoryDiagnosis,
            H45: costGather.imagingDiagnosis,
            K45: costGather.clinicalDiagnosis,
            D46: costGather.nonOperativeTreatment,
            F46: costGather.clinicalPhysicalTherapy,
            H46: costGather.surgicalTreatment,
            J46: costGather.anesthesia,
            L46: costGather.operation,
            D47: costGather.rehabilitation,
            F47: costGather.TCMTreatment,
            H47: costGather.westernMedicine,
            J47: costGather.antimicrobialDrug,
            D48: costGather.chinesePatentDrug,
            F48: costGather.chineseHerbalMedicine,
            H48: costGather.blood,
            K48: costGather.protein,
            D49: costGather.globulin,
            F49: costGather.clottingFactor,
            H49: costGather.cytokine,
            L49: costGather.disposableInspection,
            D50: costGather.disposableTreatment,
            F50: costGather.disposableOperation,
            J50: costGather.other2,
        }

        const operation = res.operationResult || {}

        const operationData = {
            D37: operation.departureMode,
            J37: operation.hospitalMame,
            J38: operation.townshipHospital,
            D39: operation.rehospitalizationPlan,
            J39: operation.rehospitalizationPurpose,
            D40: operation.beforeDay,
            F40: operation.beforeHour,
            H40: operation.beforeMinute,
            D41: operation.afterDay,
            F41: operation.afterHour,
            H41: operation.afterMinute,
        }

        const operationDetail = res.operationDetailResult || []

        let operationDetailData = {}

        operationDetail.forEach((item, index) => {
            if (index > 6) {
                return
            } else {
                operationDetailData = {
                    ...operationDetailData,
                    [`B${30 + index}`]: item.operationCode,
                    [`C${30 + index}`]: moment(item.operationDate).format('YYYYMMDD'),
                    [`D${30 + index}`]: item.operationLevel,
                    [`E${30 + index}`]: item.operationName,
                    [`F${30 + index}`]: item.operator,
                    [`G${30 + index}`]: item.firstAssistant,
                    [`H${30 + index}`]: item.lastAssistant,
                    [`I${30 + index}`]: item.notchGrade,
                    [`J${30 + index}`]: item.IncisionHealingCategory,
                    [`K${30 + index}`]: anesthesiaType(item.anesthesiaType),
                    [`L${30 + index}`]: item.anesthesiologist,
                }
            }
        })

        const outHospital = res.outHospitalResult || {}

        const outHospitalData = {
            C20: outHospital.externalCauses,
            H20: outHospital.externalCausesDisease,
            C21: outHospital.pathologicDiagnosis,
            G21: outHospital.pathologicDiagnosisDisease,
            J21: outHospital.pathologicalNo,
            C22: outHospital.drugAllergy,
            G22: outHospital.allergicDrugs,
            J22: outHospital.autopsy,
            C23: outHospital.bloodGroup,
            H23: outHospital.rh,
            C24: outHospital.chiefOfDepartment,
            F24: outHospital.firstMate,
            H24: outHospital.attendingPhysician,
            K24: outHospital.residentPhysician,
            C25: outHospital.chargeNurse,
            F25: outHospital.refresherPhysician,
            H25: outHospital.internPhysician,
            K25: outHospital.coder,
            C26: outHospital.medicalRecordQuality,
            F26: outHospital.qualityControlPhysician,
            H26: outHospital.qualityControlNurse,
            K26: moment(outHospital.qualityControlDate).format('YYYYMMDD')
        }

        const outhospitalDetail = res.outhospitalDetailResult || []

        const mainOuthospitalDetail = outhospitalDetail.find(item => item.isMain === 1) || {}
        const otherOuthospitalDetail = outhospitalDetail.filter(item => item.isMain !== 1) || []

        let otherOuthospitalDetailData = {}
        otherOuthospitalDetail.forEach((item, index) => {
            if (index > 14) {
                return
            }
            if (index > 6) {
                otherOuthospitalDetailData = {
                    ...otherOuthospitalDetailData,
                    [`G${12 + (index - 7)}`]: item.dischargeDiagnosis,
                    [`H${12 + (index - 7)}`]: item.diseaseCode ? item.diseaseCode.split(',').map(item => {
                        return item.split('x')[0]
                    }).join(',') : '',
                    [`J${12 + (index - 7)}`]: item.admissionDiagnosis
                }
            } else {
                otherOuthospitalDetailData = {
                    ...otherOuthospitalDetailData,
                    [`C${13 + index}`]: item.dischargeDiagnosis,
                    [`D${13 + index}`]: item.diseaseCode.split(',').map(item => {
                        return item.split('x')[0]
                    }).join(','),
                    [`E${13 + index}`]: item.admissionDiagnosis
                }
            }
        })
        const outhospitalDetailData = {
            C12: mainOuthospitalDetail.dischargeDiagnosis,
            D12: mainOuthospitalDetail.diseaseCode ? mainOuthospitalDetail.diseaseCode.split(',').map(item => {
                return item.split('x')[0]
            }).join(',') : '',
            E12: mainOuthospitalDetail.admissionDiagnosis,
            ...otherOuthospitalDetailData
        }

        const inHospitalBaseData = {
            I2: item.age,
            C3: item.ageMonth,
            I3: item.birthPlace,
            G2: moment(item.birthday).format('YYYYMMDD'),
            K6: item.contactAddress,
            C7: item.contactPhone,
            I6: item.contactRelationship,
            G6: item.contactsName,
            K4: item.currentAddress,
            E5: item.currentZipCode,
            G9: item.diagnose,
            E1: item.healthCard,
            G7: moment(item.hospitalizationDate).format('YYYYMMDD'),
            K7: item.hospitalizationDepartment,
            I7: item.hospitalizationHour,
            E9: item.hospitalizationLength,
            E7: item.hospitalizationMethod,
            C8: item.hospitalizationRoom,
            G1: item.hospitalizationsNumber,
            E4: item.idCard,
            // C1:item.inHospitalId,
            G8: moment(item.leaveDate).format('YYYYMMDD'),
            K8: item.leaveDepartment,
            I8: item.leaveHour,
            C9: item.leaveRoom,
            I4: item.marriage,
            C1: item.medicalPayment.length > 1 ? item.medicalPayment : ('0' + item.medicalPayment),
            // I1: item.medicalRecordNumber,
            C2: item.name,
            C4: item.nation,
            K2: item.nationality === '501' ? 'CHN' : '',
            K3: item.nativePlace,
            E3: item.newbornBirthWeight,
            G4: item.occupation,
            // C1:item.patientId,
            C5: item.phone,
            K5: item.placeOfWork,
            E6: item.placeOfWorkZipCode, // *
            G5: item.registeredAddress,
            I5: item.registeredZipCode,
            E2: item.sex,
            E8: item.transferDepartment,
            C6: item.workPhone,
        }

        const data = {...costGatherData, ...operationDetailData, ...operationData, ...outHospitalData, ...outhospitalDetailData, ...inHospitalBaseData}
        // console.log(data)
        window.electronAPI && window.electronAPI.LoadData(data)
        message.success('添加成功！')
    }

    const {loading: detailLoading, run: detailRun} = useRequest(detailUrl, {
        manual: true,
        onSuccess: (res) => {
            postData(res)
        },
        onError: () => {
            message.error('获取数据失败!')
        }
    })

    useEffect(() => {
        window.document.title = '数据列表'
        window.electronAPI && window.electronAPI.queryList((event, {name}) => {
            Modal.confirm({
                // centered: true,
                content: '是否搜索【' + name + '】',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    setSearchValue(name)
                    setPage(1)
                    setData([])
                    run({
                        params: {
                            page: 1,
                            keyword: name
                        }
                    })
                }
            })
        })
    }, [])

    // const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        run({
            params: {
                page,
                keyword: searchValue
            }
        })
    };

    return <div>
        <div className={styles.search}>
            <DatePicker locale={locale} placeholder='请选择月份' picker="month" onChange={(value, string) => {
                console.log(value, string)
            }}/>
            <Input.Search
                className={styles.input}
                value={searchValue}
                placeholder='请输入病案号'
                onChange={({target: {value}}) => {
                    setSearchValue(value)
                }}
                onSearch={(value) => {
                    setSearchValue(value)
                    setPage(1)
                    setData([])
                    run({
                        params: {
                            keyword: value
                        }
                    })
                }}
            />
        </div>
        <div id='scrollableDiv' style={{
            padding: '24px 0 24px 24px',
            maxHeight: 'calc(100vh - 120px)',
            overflow: 'auto',
            marginTop: 16
        }}>
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                scrollThreshold={1}
                hasMore={hasMore}
                loader={<div style={{textAlign: "center"}}>
                    <Spin/>
                </div>}
                endMessage={<Divider plain>没有更多数据啦~</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data || []}
                    renderItem={(item) => (
                        <List.Item
                            actions={[<Button loading={detailLoading} type="link" onClick={() => {
                                Modal.confirm({
                                    content: `确定把【${item.name}】的数据填写进表格吗？`,
                                    okText: '确定',
                                    cancelText: '取消',
                                    onOk() {
                                        return detailRun({
                                            params: {
                                                id: item.patientId,
                                                // id: '00018670'
                                            }
                                        });
                                    }
                                })
                            }}>
                                填写数据
                            </Button>]}
                        >
                            <List.Item.Meta
                                description={<div style={{color: '#000'}}>
                                    <div className={styles.item}>
                                        <div className={styles.label}>病案号：</div>
                                        <div>
                                            <SearchValueFormat
                                                searchValue={searchValue}
                                                label={item.medicalRecordNumber}
                                            /></div>
                                    </div>
                                    <div className={styles.item}>
                                        <div className={styles.label}>病人Id：</div>
                                        <div>
                                            <SearchValueFormat
                                                searchValue={searchValue}
                                                label={item.patientId}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.item}>
                                        <div className={styles.label}>姓名：</div>
                                        <div>
                                            <SearchValueFormat
                                                searchValue={searchValue}
                                                label={item.name}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.item}>
                                        <div className={styles.label}>身份证号：</div>
                                        <div>
                                            <SearchValueFormat
                                                searchValue={searchValue}
                                                label={item.idCard}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.item}>
                                        <div className={styles.label}>手机号：</div>
                                        <div>
                                            <SearchValueFormat
                                                searchValue={searchValue}
                                                label={item.phone}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.item}>
                                        <div className={styles.label}>联系人手机号：</div>
                                        <div>
                                            <SearchValueFormat
                                                searchValue={searchValue}
                                                label={item.contactPhone}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.item}>
                                        <div className={styles.label}>单位电话：</div>
                                        <div>
                                            <SearchValueFormat
                                                searchValue={searchValue}
                                                label={item.workPhone}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.item}>
                                        <div className={styles.label}>入院时间：</div>
                                        <div>
                                            {item.hospitalizationDate}
                                        </div>
                                    </div>
                                </div>}
                            />
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    </div>
};

export default GetData

import React, {useEffect, useState} from "react";
import {Button, Checkbox, DatePicker, Divider, Input, List, message, Modal, Progress, Select, Spin} from "antd";
import useRequest from "../../util/Request/useRequest";
import moment from "moment";
import {
    anesthesiaType,
    contactRelationshipType,
    hospitalizationDepartmentType,
    marriageType,
    medicalPaymentType
} from "./switch";
import styles from './index.less'
import SearchValueFormat from "./components/SearchValueFormat";
import InfiniteScroll from 'react-infinite-scroll-component';
import locale from 'antd/es/date-picker/locale/zh_CN'
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'

const listUrl = {
    url: '/bzfy/inhospitalBase/list',
    method: "GET"
}

const listV2Url = {
    url: '/bzfy/inhospitalBase/list2',
    method: "GET"
}

const detailUrl = {
    url: '/bzfy/inhospitalBase/detail',
    method: "GET"
}

const addLogUrl = {
    url: '/bzfy/log/add',
    method: "GET"
}

let limit = 200

const GetData = () => {

    const [page, setPage] = useState(1)

    const [searchValue, setSearchValue] = useState('')

    const [data, setData] = useState([])

    const [date, setDate] = useState([])

    const [type, setType] = useState('in')

    const [hasMore, setHasMore] = useState(true)

    const [checkList, setCheckList] = useState([])

    const [open, setOpen] = useState(false)

    const [batchDone, setBatchDone] = useState(false)

    const {loading, data: listData = {}, run} = useRequest({...listV2Url, params: {limit, page: 1}}, {
        response: true,
        onSuccess: (res) => {
            setPage(page + 1)
            setData([...data, ...res.data])
            setHasMore(res.data.length >= 20);
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
            F47: costGather.tcmTreatment,
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
            I43: costGather.fY_FY0ZFJE,
            D44: costGather.ordnMedServfee
        }

        const operation = res.operationResult || {}

        const operationData = {
            D37: operation.departureMode,
            J37: operation.hospitalName,
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
                    [`J${30 + index}`]: item.incisionHealingCategory,
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
            I6: contactRelationshipType(item.contactRelationship),
            G6: item.contactsName,
            K4: item.currentAddress,
            E5: item.currentZipCode,
            G9: item.diagnose,
            E1: item.healthCard,
            G7: moment(item.hospitalizationDate).format('YYYYMMDD'),
            K7: hospitalizationDepartmentType(item.hospitalizationDepartment),
            I7: item.hospitalizationHour,
            E9: item.hospitalizationLength,
            E7: item.hospitalizationMethod,
            C8: item.hospitalizationRoom,
            G1: item.hospitalizationsNumber,
            E4: item.idCard,
            G8: moment(item.leaveDate).format('YYYYMMDD'),
            K8: hospitalizationDepartmentType(item.leaveDepartment),
            I8: item.leaveHour,
            C9: item.leaveRoom,
            I4: marriageType(item.marriage),
            C1: medicalPaymentType(item.medicalPayment),
            // I1: item.medicalRecordNumber,
            C2: item.name,
            C4: item.nation,
            K2: item.nationality === '501' ? 'CHN' : '',
            K3: item.nativePlace,
            E3: item.newbornBirthWeight,
            G4: item.occupation,
            C5: item.phone,
            K5: item.placeOfWork,
            E6: item.placeOfWorkZipCode, // *
            G5: item.registeredAddress,
            I5: item.registeredZipCode,
            E2: item.sex,
            E8: item.transferDepartment,
            C6: item.workPhone,
            I9: item.diagnoseCode ? item.diagnoseCode.split('x')[0] : null
        }

        const data = {...costGatherData, ...operationDetailData, ...operationData, ...outHospitalData, ...outhospitalDetailData, ...inHospitalBaseData}
        // console.log(data['D43'])
        const batchAdd = window.batchAdd || {}
        if (batchAdd.loading) {
            window.electronAPI && window.electronAPI.createHealth({data, patientId: item.patientId, end: batchAdd.end})
        } else {
            window.electronAPI && window.electronAPI.LoadData({data, patientId: item.patientId})
            message.success('添加成功！')
        }
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

    const {run: addLogRun} = useRequest(addLogUrl, {
        manual: true,
    })

    const startSearch = (params) => {
        // setCheckList([])
        setPage(1)
        setData([])
        run({
            params: {
                ...params,
                limit,
                page: 1
            }
        })
    }

    useEffect(() => {
        window.document.title = '数据列表'
        window.electronAPI && window.electronAPI.queryList((event, {name}) => {
            if (window.batchAdd && window.batchAdd.loading) {
                return
            }
            Modal.confirm({
                // centered: true,
                content: '是否搜索【' + name + '】',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    startSearch({keyword: name})
                    setSearchValue(name)
                    setDate('');
                    setType('in');
                }
            })
        })
        window.electronAPI && window.electronAPI.createHealthDone((event) => {
            nextCreat()
        })

        window.electronAPI && window.electronAPI.postDataDone((event, data) => {
            addLogRun({
                params: {
                    patientId: data.patientId
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
                keyword: searchValue,
                bTime: date[0] || null,
                eTime: date[1] || null,
                type,
                limit,
            }
        })
    };

    const nextCreat = () => {
        const {list, loading, index} = window.batchAdd || {}
        if (loading) {
            const newIndex = index + 1
            if (newIndex === list.length) {
                window.batchAdd = {
                    ...window.batchAdd,
                    index: newIndex,
                    loading: false
                }
                setBatchDone(true)
                message.success('添加成功！')
                return
            }
            window.batchAdd = {
                ...window.batchAdd,
                index: newIndex,
                end: newIndex === list.length - 1
            }
            createHealth(list[newIndex], newIndex);
        }
    }

    const createHealth = (item, index) => {
        detailRun({
            params: {
                id: item.patientId,
            }
        }).catch(() => {
            window.batchAdd = {
                ...window.batchAdd,
                errors: [...window.batchAdd.errors, index]
            }
            nextCreat()
        });
    }

    const batchAddTitle = () => {
        if (window.batchAdd && window.batchAdd.loading) {
            return '正在保存中...'
        } else {
            return '已选中信息'
        }
    }

    return <div>
        <div className={styles.search}>
            <div className={styles.type}>
                <div className={styles.searchLabel}>
                    类型：
                </div>
                <Select
                    options={[{label: '入院', value: 'in'}, {label: '出院', value: 'out'}]}
                    value={type}
                    onChange={setType}
                />
                <DatePicker.RangePicker
                    locale={locale}
                    allowClear
                    value={date.length > 0 ? [moment(date[0]), moment(date[1])] : []}
                    onChange={(date, dateString = []) => {
                        const dates = dateString.filter(item => item);
                        setDate(dates.length === 0 ? [] : [moment(dateString[0]).format('YYYY-MM-DD'), moment(dateString[1]).format('YYYY-MM-DD')]);
                    }}
                />
            </div>
            <div className={styles.type}>
                <div className={styles.searchLabel}>
                    关键字：
                </div>
                <Input
                    className={styles.input}
                    value={searchValue}
                    placeholder='请输入病案号'
                    onChange={({target: {value}}) => {
                        setSearchValue(value)
                    }}
                />
            </div>
            <div className={styles.action}>
                <div className={styles.searchButton}>
                    <Button type='primary' onClick={() => {
                        startSearch({
                            keyword: searchValue,
                            bTime: date[0] || null,
                            eTime: date[1] || null,
                            type
                        })
                    }}>搜索</Button>
                    <Button onClick={() => setCheckList(checkList.length === data.length ? [] : data)}>
                        {checkList.length === data.length ? '取消全选' : '全选'}
                    </Button>
                </div>

                <div>
                    当前页：{listData.current}
                    &nbsp;&nbsp;
                    每页条数：{listData.pageSize}
                    &nbsp;&nbsp;
                    共 {listData.count} 条数据
                </div>
            </div>
        </div>
        <div id='scrollableDiv' style={{
            padding: '0 0 24px 24px',
            maxHeight: `calc(100vh - 160px - ${checkList.length > 0 ? 56 : 0}px)`,
            overflow: 'auto',
            marginTop: 16
        }}>
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                scrollThreshold={1}
                hasMore={hasMore}
                loader={<div style={{textAlign: "center"}}>
                    <Spin />
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
                                description={<div className={styles.content}>
                                    <div>
                                        <Checkbox
                                            checked={checkList.map(item => item.patientId).find(patientId => patientId === item.patientId)}
                                            onChange={({target: {checked}}) => {
                                                setCheckList(checked ? [...checkList, item] : checkList.filter(checkItem => checkItem.patientId !== item.patientId))
                                            }}
                                        />
                                    </div>
                                    <div style={{color: '#000'}}>
                                        <div className={styles.item}>
                                            <div className={styles.label}>病案号：</div>
                                            <div>
                                                <SearchValueFormat
                                                    searchValue={searchValue}
                                                    label={item.medicalRecordNumber}
                                                />
                                            </div>
                                            <div style={{width: 12}} />
                                            <div className={styles.item}>
                                                <div className={styles.label}>病人Id：</div>
                                                <div>
                                                    <SearchValueFormat
                                                        searchValue={searchValue}
                                                        label={item.patientId}
                                                    />
                                                </div>
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
                                            <div style={{width: 12}} />
                                            <div className={styles.label}>手机号：</div>
                                            <div>
                                                <SearchValueFormat
                                                    searchValue={searchValue}
                                                    label={item.phone}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.item}>
                                            <div className={styles.label}>入院时间：</div>
                                            <div>
                                                {item.hospitalizationDate || '-'}
                                            </div>
                                            <div style={{width: 12}} />
                                            <div className={styles.label}>出院时间：</div>
                                            <div>
                                                {item.leaveDate || '-'}
                                            </div>
                                        </div>
                                        <div className={styles.item}>
                                            <div className={styles.label}>填报次数：</div>
                                            <div>
                                                {item.count || 0}
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            />
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
        <div className={styles.footer} hidden={checkList.length === 0}>
            <div style={{flexGrow: 1}}>
                已选中 <span className={styles.number}>{checkList.length}</span> 个
            </div>
            <Button type='primary' onClick={() => {
                window.batchAdd = {
                    errors: [],
                    loading: false,
                    index: 0,
                    list: checkList,
                    end: checkList.length === 1
                }
                setBatchDone(false)
                setOpen(true)
            }}>批量保存</Button>
        </div>

        <Modal
            destroyOnClose={true}
            onCancel={() => setOpen(false)}
            title={batchDone ? '批量保存完成' : batchAddTitle()}
            maskClosable={false}
            open={open}
            footer={[
                <Button key={0} onClick={() => {
                    setOpen(false)
                }}>取消</Button>,
                <Button
                    hidden={batchDone}
                    key={1}
                    type='primary'
                    loading={window.batchAdd && window.batchAdd.loading}
                    onClick={() => {
                        window.batchAdd = {
                            ...window.batchAdd,
                            loading: true
                        }
                        createHealth(checkList[0], 0)
                    }}>
                    {window.batchAdd && window.batchAdd.loading ? '正在批量保存中' : '批量保存'}
                </Button>
            ]}
        >
            {(window.batchAdd && window.batchAdd.loading) ?
                <div style={{textAlign: 'center'}}>
                    <Progress
                        type="circle"
                        percent={((window.batchAdd.index) / (window.batchAdd.list.length)) * 100}
                        format={(percent) => `${window.batchAdd.index} / ${window.batchAdd.list.length}`}
                    />
                </div>
                :
                <div style={{maxHeight: '50vh', overflow: 'auto'}}>
                    <List
                        size="small"
                        dataSource={checkList}
                        renderItem={(item, index) => {
                            return <List.Item
                                key={index}
                                extra={(window.batchAdd && window.batchAdd.index) > index &&
                                (typeof (window.batchAdd.errors || []).find(item => item === index) === "number" ?
                                        <CloseCircleOutlined style={{color: 'red'}} /> :
                                        <CheckCircleOutlined style={{color: 'green'}} />
                                )}
                            >
                                <div className={styles.checkedList}>
                                    <div className={styles.item}>
                                        <div className={styles.label}>病案号：</div>
                                        <div>
                                            {item.medicalRecordNumber}
                                        </div>
                                    </div>
                                    <div className={styles.item}>
                                        <div className={styles.label}>姓名：</div>
                                        <div>
                                            {item.name}
                                        </div>
                                    </div>
                                </div>
                            </List.Item>
                        }}
                    />
                </div>}
        </Modal>
    </div>
};

export default GetData

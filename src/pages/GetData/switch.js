export const anesthesiaType = (value) => {
    switch (value) {
        case '全身麻醉':
            return 1
        case '椎管内麻醉':
            return 2
        case '局部麻醉':
            return 3
        case '复合麻醉':
            return 4
        case '其他麻醉方法':
            return 9
        case '吸入麻醉':
            return 11
        case '静脉麻醉':
            return 12
        case '基础麻醉':
            return 12
        case '蛛网膜下腔阻滞麻醉':
            return 21
        case '硬脊膜外腔阻滞麻醉':
            return 22
        case '神经丛阻滞麻醉':
            return 31
        case '神经节阻滞麻醉':
            return 32
        case '神经阻滞麻醉':
            return 33
        case '区域阻滞麻醉':
            return 34
        case '局部浸润麻醉':
            return 35
        case '表面麻醉':
            return 36
        case '静吸复合全麻':
            return 41
        case '针药复合麻醉':
            return 42
        case '神经丛与硬膜外阻滞复合麻醉':
            return 43
        case '全麻复合全身降温':
            return 44
        case '全麻复合控制性降压':
            return 45
        default:
            return null

    }
}

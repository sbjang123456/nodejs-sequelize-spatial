const exceptionCode = require('./exception.code');

class CommonResult {
    constructor(success, code, msg) {
        this.success = success;
        this.code = code;
        this.msg = msg;
        this.result = null;
    }

    setResult(result) {
        this.result = result;
    }

    output() {
        const output = {
            success: this.success,
            code: this.code,
            msg: this.msg
        };

        if (this.result || this.result === 0) {
            output.result = this.result;
        }

        return output;
    }
}

const CommonResponse = {
    SUCCESS: {
        code: 0,
        msg: "성공하였습니다."
    },
    FAIL: {
        code: -1,
        msg: "실패하였습니다."
    }
};

const getFailByCodeName = (code, msg) => {
    const commonResult = new CommonResult(
        false,
        code ? code : CommonResponse.FAIL.code,
        msg ? msg : CommonResponse.FAIL.msg
    );
    return commonResult.output();
};
const getFailByException = (exceptionName) => {
    const { code, msg } = exceptionCode[exceptionName];
    const commonResult = new CommonResult(false, code, msg);
    return commonResult.output();
};

module.exports = {
    /**
     * 성골
     * @param result 결과데이터
     * @returns {{msg: *, code: *, success: *}}
     */
    getSuccessResult(result) {
        const commonResult = new CommonResult(true, CommonResponse.SUCCESS.code, CommonResponse.SUCCESS.msg);
        if (result || result === 0) {
            commonResult.setResult(result)
        }
        return commonResult.output();
    },
    /**
     * 실패
     * @param code
     * @param msg
     * @returns {{}}
     */
    getFailResult(code, msg) {
        let output = {};
        if (code && !msg) {
            output = getFailByException(code);
        } else if (code && msg) {
            output = getFailByCodeName(code, msg);
        } else if (!code && !msg) {
            output = getFailByCodeName();
        }
        return output;
    },
};

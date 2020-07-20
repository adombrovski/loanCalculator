import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'

interface ILoanCalcuState {
    firstInstallmentProcent: string
    loanAmount: string
    pereod: string
}
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const LoanCalculator = () => {
    const [loanCalcuState, setLoanCalcuState] = useState<ILoanCalcuState>({
        loanAmount: "",
        firstInstallmentProcent: "0",
        pereod: "1 год"
    });

    const setLoanCalcuStatePropByKey = <T, K>(p: string, v: K) =>
        setLoanCalcuState((ps: ILoanCalcuState) => ({ ...ps, [p]: v }));

    const isNumber = (e: ChangeEvent) => (e.target.value === '' || /^[0-9\b]+$/.test(e.target.value)) ? true : false;

    const saveNumbers = (e: ChangeEvent) =>
        isNumber(e) && setLoanCalcuStatePropByKey("loanAmount", e.target.value);

    const formatedNumber = (num: number) => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    const countMonthlyPayment = () => {
        const price = (+loanCalcuState.loanAmount * (1 - (+loanCalcuState.firstInstallmentProcent / 100)));
        const INTREST = 0.015;
        const pereod = +loanCalcuState.pereod.charAt(0);
        return Math.round(((price * INTREST) / (1 - (Math.pow(1 / (1 + INTREST), pereod)))) / 12);
    }

    return (
        <div>
            <Container>
                <Form className="col-md-6 mt-3">
                    <Form.Group controlId="loanAmount">
                        <div className="col">
                            <Form.Label>Сумма кредита</Form.Label>
                            <Form.Control
                                autoComplete="off" type="text"
                                maxLength={9} value={loanCalcuState.loanAmount}
                                onChange={
                                    (e: ChangeEvent) => saveNumbers(e)
                                } />
                        </div>
                    </Form.Group>

                    <Form.Group controlId="firstInstallment">
                        <div className="col">
                            <Form.Label>Первый взнос {loanCalcuState.firstInstallmentProcent}%</Form.Label>
                            <Form.Control
                                type="range"
                                min={0} max={100}
                                step={1}
                                value={loanCalcuState.firstInstallmentProcent}
                                onChange={
                                    (e: ChangeEvent) =>
                                        setLoanCalcuStatePropByKey('firstInstallmentProcent', e.target.value)
                                }
                                custom />
                        </div>
                    </Form.Group>

                    <Form.Group controlId="loanPereod">
                        <div className="col-md-5">
                            <Form.Label>Срок кредита</Form.Label>
                            <Form.Control as="select" onChange={
                                (e: ChangeEvent) => setLoanCalcuStatePropByKey("pereod", e.target.value)
                            }>
                                <option>1 год</option>
                                <option>2 года</option>
                                <option>3 года</option>
                                <option>4 года</option>
                                <option>5 лет</option>
                                <option>6 лет</option>
                            </Form.Control>
                        </div>
                    </Form.Group>

                    <Form.Group controlId="mountyPayment">
                        <div className="col justify-content-end d-flex align-items-center">
                            <div>в месяц: </div>
                            <div style={{ fontSize: '1.5em', paddingLeft: '10px' }}>{formatedNumber(countMonthlyPayment())} EUR</div>
                        </div>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    );
}

export default LoanCalculator;

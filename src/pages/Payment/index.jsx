import FormPersonalInfo from '@components/FormStep1';
import Step from '@components/SidebarForm/step';
import Classes from './style.module.scss';
import PlanningPage from '@components/FormStep2';
import AddOns from '@components/FormStep3';

const PaymentPage = () => {
  const page = 0;

  return (
    <main>
      <div className={Classes.Container}>
        <div className={Classes.Steps}>
          <Step step={1} title="YOUR INFO" active={page === 0} />
          <Step step={2} title="SELECT PLAN" active={page === 1} />
          <Step step={3} title="ADD-ONS" active={page === 2} />
          <Step step={4} title="SUMMARY" active={page >= 3} />
        </div>
        <div className={Classes.content}>
          {/* <FormPersonalInfo /> */}
          {/* <PlanningPage /> */}
          {/* <AddOns /> */}
          <div className={page === 0 ? `${Classes.navigation} ${Classes.btnRight}` : Classes.navigation}>
            {page !== 0 && <button className={Classes.btn1}>Go Back</button>}
            <button type="submit" className={Classes.btn2}>
              {page === 3 ? 'Confirm' : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentPage;

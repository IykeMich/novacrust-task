import { useLocation, useNavigate } from "react-router-dom";
import { RoutesConstant } from "@/utils/constant/RoutesConstant";
import { DefaultButton } from "@/components/input/DefaultButton";
import SuccessCheckGif from "@/assets/animation/success-check.gif";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  const handleBackToConversion = () => {
    navigate(RoutesConstant.conversion.index);
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg text-center mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-center mx-auto mb-4">
            <img 
              src={SuccessCheckGif} 
              alt="Success Check" 
              className='size-[100px] md:size-[120px] lg:size-[140px]' 
            />
          </div>
          <h1 className="text-2xl! font-semibold text-gray-900 mb-2">
            Conversion Successful!
          </h1>
          <p className="text-gray-600">
            Your conversion has been completed successfully.
          </p>
        </div>

        {formData && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">You paid:</span>
                <span className="font-medium">
                  {formData.youPay} {formData.youPayCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">You received:</span>
                <span className="font-medium">
                  {formData.youReceive} {formData.youReceiveCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pay from:</span>
                <span className="font-medium capitalize">{formData.payFrom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pay to:</span>
                <span className="font-medium capitalize">{formData.payTo}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          <DefaultButton
            type="button"
            label="Back to Conversion"
            onClick={handleBackToConversion}
            extraClassName="bg-[#013941] hover:bg-[#013941]/90 text-white rounded-full py-6 mt-6"
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;


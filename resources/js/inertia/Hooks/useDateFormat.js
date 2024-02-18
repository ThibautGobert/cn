import { format } from 'date-fns';

const useDateFormat = (date, dateFormat = 'dd/MM/yyyy') => {
    return format(date, dateFormat);
};

export default useDateFormat;

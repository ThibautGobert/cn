import { format } from 'date-fns';

const useDateFormat = (date, dateFormat) => {
    return format(date, dateFormat);
};

export default useDateFormat;

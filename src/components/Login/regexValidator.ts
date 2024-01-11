// emailRegex = /^[^\s@]+@[^\s@]+$/;
// passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const emailValidator = (email: string): boolean => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+$/;
    return emailRegex.test(email);
};

export const passwordValidator = (password: string): boolean => {
    const passwordRegex: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return passwordRegex.test(password);
};

import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import { ThemeProvider, useTheme } from '@mui/material/styles';

import { useSettingStore } from '@/state/settingStore';

import { allNgBanks } from '@/util/banks';
import { restCountries } from '@/util/countries';
import { getCountries, getUserLocation } from '@/util/location';
import { customTextFieldTheme, MuiTextFieldStyle } from '@/util/mui';

import FlutterwaveLogo2 from "@/assets/images/FlutterwaveLogo2.png";
import { apiEndpoint } from '@/util/resources';
import axios from 'axios';
import { useUserStore } from '@/state/userStore';
import CountryDialSelectComponent from './CountryDialSelect';
import { flutterwavePaymentDetailsInterface } from '@/constants/typesInterface';


const formSchema = yup.object({
    bank: yup.string().required().min(2, "Please enter a valid bank name").trim().label("Bank"),
    accountNumber: yup.string().required().min(10).max(10).trim().label("Account Number"),
    accountName: yup.string().trim().label("Account Name"),

    currency: yup.string().required().min(2).trim().label("Currency"),

    countryCode: yup.string().min(2).trim().label("country dial code"),

    verificationNumber: yup.string().required().min(7, "Incorrect phone number").max(15, "Incorrect phone number").trim().label("Phone Number"),
    // verificationNumber: yup.string().trim().label("Phone Number"),
});


interface _Props {
    openModal: boolean,
    closeModal: () => void;
    changeMethod: () => void;
    confirmBtn: (data: flutterwavePaymentDetailsInterface) => void;
}

const currencyCodes = [
    "NGN", "USD", "EUR", "JPY", "GBP", "AUD",
    "CHF", "CAD", "CNY", "HKD", "SGD",
];

const PayoutSetFlutterwaveModalComponent: React.FC<_Props> = ({
    openModal, closeModal, changeMethod, confirmBtn
}) => {
    // const [useEmail_n_PhoneNo, setUseEmail_n_PhoneNo] = useState(false);
    const outerTheme = useTheme();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const accessToken = useUserStore((state) => state.accessToken);
    const [countries, setCountries] = useState(restCountries);
    const [banks, setBanks] = useState(allNgBanks);
    const [selectCountryCode, setSelectCountryCode] = useState("");


    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    
    useEffect(() => {
        getBanks();

        const sortedCountries = countries.sort((a: any, b: any) => {
            if (a.name.common < b.name.common) return -1;
            if (a.name.common > b.name.common) return 1;
            return 0;
        });
        setCountries(sortedCountries);

        getCountries().then((countryRes) => {
            setCountries(countryRes);
    
            getUserLocation().then((res) => {
                const currentCountry = sortedCountries.filter(item => item.name.common == res.country);
                
                const countryCode = currentCountry[0].idd.root + currentCountry[0].idd.suffixes[0];
                setValue("countryCode", countryCode);
                setTimeout(() => {
                    setSelectCountryCode(countryCode);
                }, 500);
            })
        });
    }, []);

    const {
        handleSubmit, register, setValue, formState: { errors, isSubmitting, isValid } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });

    const getBanks = async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/payouts/banks/NG`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            // console.log(response);
            // setBanks(response.data);

            const sortedBanks = response.data.sort((a: any, b: any) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
            setBanks(sortedBanks);
            
        } catch (error: any) {
            // const errorResponse = error.response.data;
            console.error(error.response.data);
        }
    }

    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        // console.log(formData);

        setApiResponse({
            display: false,
            status: true,
            message: ""
        });


        // return;
        confirmBtn({ accountName: '', countryCode: '', ...formData });


    }




    return (
        <Modal
            open={openModal}
            onClose={() => closeModal() }
            aria-labelledby="payout-modal-title"
            aria-describedby="payout-modal-description"
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    outline: "none",
                }}
            >
                <Box 
                    sx={{
                        bgcolor: darkTheme ? "#272727" : "#fff",
                        width: "100%",
                        maxWidth: {xs: "92%", sm: "496px"},
                        // maxHeight: "605px",
                        maxHeight: "95%",
                        borderRadius: "12px",
                        p: "25px",
                        color: darkTheme ? "#fff" : "#000",
                        overflow: "scroll"
                    }}
                >
                    <Box  id="payout-modal-title">
                        <Box sx={{textAlign: "right"}}>
                            <IconButton onClick={() => closeModal() }>
                                <CloseIcon 
                                    sx={{color: darkTheme ? "#fff" : "#000", fontSize: "30px"}} 
                                />
                            </IconButton>
                        </Box>

                        <Box sx={{textAlign: 'center'}}>
                            <img
                                src={FlutterwaveLogo2} alt='Flutterwave Logo Image'
                                style={{
                                    objectFit: "contain",
                                    width: "60%"
                                }}
                            />
                        </Box>
                    </Box>

                    <Box id="payout-modal-description" sx={{mt: 5}}>

                        <ThemeProvider theme={customTextFieldTheme(outerTheme, darkTheme)}>
                            <form noValidate onSubmit={ handleSubmit(onSubmit) } >

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Box>
                                            <Typography sx={{
                                                fontWeight: "400",
                                                fontSize: "15.38px",
                                                lineHeight: "38.44px",
                                                letterSpacing: "-0.12px",
                                                textAlign: "left"
                                            }}> Select Bank </Typography>

                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="country"
                                                    id="country-select"
                                                    label=""
                                                    defaultValue=""
                                                    // value={userCountry}

                                                    sx={{
                                                        color: darkTheme ? "white" : '#272727',
                                                        borderRadius: "13.79px",
                                                        '.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? 'gray' : 'gray',
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : '#272727', // '#434e5e',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : '#272727', // 'var(--TextField-brandBorderHoverColor)',
                                                        },
                                                        '.MuiSvgIcon-root ': {
                                                            fill: `${darkTheme ? '#ccc' : 'black'} !important`,
                                                        }
                                                    }}
                                                    
                                                    error={ errors.bank ? true : false }
                                                    { ...register('bank') }
                                                >
                                                    { banks.map((bank: any, index) => (
                                                        <MenuItem key={index} value={bank.name}>
                                                            {bank.name}
                                                        </MenuItem>
                                                    )) }
                                                </Select>
                                            </FormControl>

                                            { errors.bank && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.bank?.message }</Box> }
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box>
                                            <Typography sx={{
                                                fontWeight: "400",
                                                fontSize: "15.38px",
                                                lineHeight: "38.44px",
                                                letterSpacing: "-0.12px"
                                            }}> Account Number </Typography>

                                            <TextField 
                                                variant="outlined" 
                                                fullWidth 
                                                id='accountNumber'
                                                type='number'
                                                label=''
                                                inputMode='numeric'
                                                defaultValue=""
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                    },
                                                }}

                                                sx={{
                                                    ...MuiTextFieldStyle(darkTheme),
                                                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                                        display: "none",
                                                    },
                                                    "& input[type=number]": {
                                                        MozAppearance: "textfield",
                                                    },
                                                }}
                                                
                                                error={ errors.accountNumber ? true : false }
                                                { ...register('accountNumber') }
                                            />
                                            { errors.accountNumber && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.accountNumber?.message }</Box> }

                                        </Box>
                                    </Grid>
                                </Grid>

                                <Box sx={{ my: 3 }}>
                                    <TextField 
                                        variant="outlined" 
                                        fullWidth 
                                        id='accountName'
                                        type='text'
                                        label=''
                                        inputMode='text'
                                        defaultValue=""
                                        // disabled
                                        placeholder='Account Name(automatically generated)'
                                        InputLabelProps={{
                                            style: { color: '#c1c1c1', fontWeight: "400" },
                                        }}
                                        InputProps={{
                                            sx: {
                                                borderRadius: "16px",
                                            },
                                            readOnly: true,
                                        }}


                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                '& fieldset.MuiOutlinedInput-notchedOutline': {
                                                    borderColor: darkTheme ? '#fff' : "#000",
                                                },
                                                // '&:hover .MuiOutlinedInput-notchedOutline': {
                                                //     borderColor: darkTheme ? '#fff' : '#000',
                                                // },
                                                // "&.Mui-focused fieldset": {
                                                //     borderColor: darkTheme ? '#fff' : '#000',
                                                // },
                                                "& .MuiInputBase-input.Mui-disabled::placeholder": {
                                                    color: "gray",
                                                    opacity: 0.8,
                                                    // "-webkit-text-fill-color": "gray",
                                                    // WebkitTextFillColor: "gray",
                                                },
                                            },
                                        }}
                                        
                                        error={ errors.accountName ? true : false }
                                        { ...register('accountName') }
                                    />
                                    { errors.accountName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.accountName?.message }</Box> }

                                </Box>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ flexGrow: 1, width: '100%' }}>
                                            <Typography sx={{
                                                fontWeight: "400",
                                                fontSize: "15.38px",
                                                lineHeight: "38.44px",
                                                letterSpacing: "-0.12px",
                                                textAlign: "left"
                                            }}> Currency </Typography>

                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="currency"
                                                    id="currency-select"
                                                    label=""
                                                    defaultValue=""
                                                    // value={userCountry}

                                                    sx={{
                                                        color: darkTheme ? "white" : '#272727',
                                                        borderRadius: "13.79px",
                                                        '.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? 'gray' : 'gray',
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : '#272727', // '#434e5e',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : '#272727', // 'var(--TextField-brandBorderHoverColor)',
                                                        },
                                                        '.MuiSvgIcon-root ': {
                                                            fill: `${darkTheme ? '#ccc' : 'black'} !important`,
                                                        }
                                                    }}
                                                    
                                                    error={ errors.currency ? true : false }
                                                    { ...register('currency') }
                                                >
                                                    { currencyCodes.map((currencyCode: any, index) => (
                                                        <MenuItem key={index} value={currencyCode}>
                                                            {currencyCode}
                                                        </MenuItem>
                                                    )) }
                                                </Select>
                                            </FormControl>

                                            { errors.currency && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.currency?.message }</Box> }
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ flexGrow: 1, width: '100%' }}>
                                            <Typography sx={{
                                                fontWeight: "400",
                                                fontSize: "15.38px",
                                                lineHeight: "38.44px",
                                                letterSpacing: "-0.12px",
                                                textAlign: "left"
                                            }}> Verification Number </Typography>



                                            <Box 
                                                sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center',
                                                    borderRadius: '13.79px',
                                                    pl: 1,
                                                    border: '1px solid #b9c1cd',
                                                    '&:hover': {
                                                        border: '1px solid #434e5e'
                                                    },
                                                    '&:focus': {
                                                        border: '1px solid #434e5e'
                                                    },
                                                    "&:active": {
                                                        border: '1px solid #434e5e'
                                                    }
                                                }}
                                            >

                                                <CountryDialSelectComponent 
                                                    countries={countries}
                                                    darkTheme={darkTheme}
                                                    selectCountryCode={selectCountryCode}
                                                    setSelectCountryCode={setSelectCountryCode}
                                                />

                                                <TextField 
                                                    variant="outlined" 
                                                    fullWidth 
                                                    id='verificationNumber'
                                                    type='tel'
                                                    inputMode='tel'
                                                    label=''
                                                    defaultValue=""
                                                    InputLabelProps={{
                                                        style: { color: '#c1c1c1', fontWeight: "400" },
                                                    }}
                                                    InputProps={{
                                                        sx: {
                                                            borderRadius: "16px",
                                                            p: 0
                                                        }
                                                    }}

                                                    sx={{
                                                        ...MuiTextFieldStyle(darkTheme),

                                                        "& .MuiOutlinedInput-input": {
                                                            pl: 0
                                                        },
                                                        '& .MuiOutlinedInput-root': {
                                                            // pl: 0.5,
                                                            // pr: 0,
                                                            overflow: 'hidden',

                                                            // bgcolor: darkTheme ? '#1C1B1F' : '#EFEFEF',
                                                            // borderRadius: '13.79px',
                                                            // height: '42px',
                                                            border: 0,
                                                    
                                                            '& fieldset': {
                                                                border: 0,
                                                            },
                                                            '&:hover fieldset': {
                                                                border: 0,
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                border: 0,
                                                            },
                                                        },
                                                    }}
                                                    
                                                    error={ errors.verificationNumber ? true : false }
                                                    { ...register('verificationNumber') }
                                                />
                                            </Box>


                                            {/* <TextField 
                                                variant="outlined" 
                                                fullWidth 
                                                id='verificationNumber'
                                                type='tel'
                                                inputMode='tel'
                                                label=''
                                                defaultValue=""
                                                // placeholder='Used to inform you when transactions are being made on your account'
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                    },
                                                    startAdornment: <InputAdornment position="start">
                                                        <CountryDialSelectComponent 
                                                            countries={countries}
                                                            darkTheme={darkTheme}
                                                            selectCountryCode={selectCountryCode}
                                                            setSelectCountryCode={setSelectCountryCode}
                                                        />
                                                    </InputAdornment>,
                                                }}

                                                sx={{
                                                    ...MuiTextFieldStyle(darkTheme),
                                                    '& .MuiOutlinedInput-root': {
                                                        pl: 0.5,
                                                        pr: 0,
                                                        overflow: 'hidden'
                                                    }
                                                }}
                                                
                                                error={ errors.verificationNumber ? true : false }
                                                { ...register('verificationNumber') }
                                            />
                                            { errors.verificationNumber && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.verificationNumber?.message }</Box> } */}

                                        </Box>
                                    </Grid>
                                </Grid>


                                {
                                    apiResponse.display && (
                                        <Stack sx={{ width: '100%', my: 2 }}>
                                            <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                        </Stack>
                                    )
                                }
                                        
                                <Box 
                                    sx={{ 
                                        my: 5,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <Button variant="contained" 
                                        fullWidth type="submit" 
                                        disabled={ !isValid || isSubmitting } 
                                        sx={{ 
                                            bgcolor: darkTheme ? "#fff" : "#272727",
                                            borderRadius: "17px",
                                            // p: "10px 26px 10px 26px",
                                            p: "16px 25px",
                                            width: "fit-content",
                                            height: "auto",
                                            "&.Mui-disabled": {
                                                background: "#9c9c9c",
                                                color: "#797979"
                                            },
                                            "&:hover": {
                                                bgcolor: darkTheme ? "#fff" : "#272727",
                                            },
                                            "&:active": {
                                                bgcolor: darkTheme ? "#fff" : "#272727",
                                            },
                                            "&:focus": {
                                                bgcolor: darkTheme ? "#fff" : "#272727",
                                            },

                                            fontWeight: '700',
                                            fontSize: "12px",
                                            lineHeight: "12px",
                                            // letterSpacing: "-0.13px",
                                            // textAlign: 'center',
                                            color: darkTheme ? "#000" : "#fff",
                                            textTransform: "none"
                                        }}
                                    >
                                        <span style={{ display: isSubmitting ? "none" : "initial" }}>Confirm</span>
                                        <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} />
                                    </Button>
                                </Box>

                                <Typography variant='body2'
                                    onClick={() => changeMethod()}
                                    sx={{
                                        fontWeight: '400',
                                        fontSize: '14px',
                                        // lineHeight: '8px',
                                        letterSpacing: '-0.31px',
                                        textAlign: 'center',
                                        cursor: "pointer"
                                    }}
                                >Change Payment method</Typography>

                            </form>
                        </ThemeProvider>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default PayoutSetFlutterwaveModalComponent;
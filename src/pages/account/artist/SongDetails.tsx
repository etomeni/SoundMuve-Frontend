import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CircleIcon from '@mui/icons-material/Circle';

import AccountWrapper from '@/components/AccountWrapper';
import { useSettingStore } from '@/state/settingStore';

import albumSampleArtImg from '@/assets/images/albumSampleArt.png';
import appleMusiclogo from '@/assets/images/apple.png';
import appleMusicLightlogo from '@/assets/images/appleLightTheme.png';
import spotifylogo from '@/assets/images/spotify.png';
import spotifyLghtThemelogo from '@/assets/images/spotifyLghtTheme.png';
import AppleSportifyCheckmark from '@/components/AppleSportifyCheckmark';
import { useReleaseStore } from '@/state/releaseStore';



const dataset = [
    {
      percentageValue: 21,
      month: 'Jan',
    },
    {
      percentageValue: 28,
      month: 'Feb',
    },
    {
      percentageValue: 41,
      month: 'Mar',
    },
    {
      percentageValue: 73,
      month: 'Apr',
    },
    {
      percentageValue: 99,
      month: 'May',
    },
    {
      percentageValue: 144,
      month: 'Jun',
    },
    {
      percentageValue: 319,
      month: 'July',
    },
    {
      percentageValue: 249,
      month: 'Aug',
    },
    {
      percentageValue: 131,
      month: 'Sept',
    },
    {
      percentageValue: 55,
      month: 'Oct',
    },
    {
      percentageValue: 48,
      month: 'Nov',
    },
    {
      percentageValue: 25,
      month: 'Dec',
    },
];
  
  

function SongDetails() {
    const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const mdDevice = useMediaQuery('(min-width:900px)');
    const smDevice = useMediaQuery('(min-width:600px)');
    
    const songDetails = useReleaseStore((state) => state.songDetails);



    return (
        <AccountWrapper>
            <Box sx={{px: {xs: 2, md: 5, lg: 12}, pb: 5, position: "relative", zIndex: 10, mt: {xs: 7, md: 10}  }}>


                <Box sx={{ mt: 7 }}>
                    <Box
                        sx={{
                            backgroundColor: darkTheme ? "none" : "#272727",
                            borderRadius: {xs: "13.43px", md: "22px"},
                            display: {xs: "none", sm: "flex"},
                            flexDirection: "column",
                            p: {xs: "15px", md: "25px"},
                            color: "#fff",

                        }}
                    >
                        <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                            <IconButton 
                                onClick={() => navigate(-1)}
                                sx={{ color: "#fff", mb: 2 }}
                            >
                                <ChevronLeftIcon />
                            </IconButton>

                            <Box>
                                <FormControl fullWidth sx={{ width: "fit-content" }}>
                                    <Select
                                        labelId="sortByDays"
                                        id="sortByDays-select"
                                        label=""
                                        defaultValue="Last 30 Days"
                                        placeholder='Last 30 Days'

                                        sx={{
                                            color: "#fff",
                                            borderRadius: "8px",
                                            bgcolor: darkTheme ? "#272727" : "#414141",
                                            // textAlign: "center",
                                            fontWeight: "900",
                                            border: "none",
                                            fontSize: {xs: "10px", md: "20px"},
                                            lineHeight: {xs: "12px", md: "24px"},
                                            letterSpacing: {xs: "-0.67px", md: "-1.34px"},

                                            '& .MuiSelect-select': {
                                                p: "5px 14px"
                                            },

                                            '.MuiOutlinedInput-notchedOutline': {
                                                border: "none",
                                                // borderColor: '#fff',
                                                p: 0
                                            },
                                            // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            //     borderColor: '#fff',
                                            // },
                                            // '&:hover .MuiOutlinedInput-notchedOutline': {
                                            //     borderColor: '#fff',
                                            // },
                                            '.MuiSvgIcon-root ': {
                                                fill: "#797979",
                                            }
                                        }}
                                    >
                                        <MenuItem value="Last 30 Days">
                                            Last 7 Days
                                        </MenuItem>
                                        <MenuItem value="Last 30 Days">
                                            Last 14 Days
                                        </MenuItem>
                                        <MenuItem value="Last 30 Days">
                                            Last 30 Days
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Stack>


                        <Typography
                            sx={{
                                fontWeight: "900",
                                fontSize: {xs: "21.78px", md: "60px"},
                                lineHeight: {xs: "8.71px", md: "24px"},
                                mt: 3
                            }}
                        > { songDetails.song_title } </Typography>

                        <Stack direction="row" mt={5} spacing="20px" alignItems="center">
                            <Box
                                sx={{
                                    maxHeight: "227px",
                                    maxWidth: "263px",
                                    borderRadius: "8px",
                                    overflow: "hidden"
                                }}
                            >
                                <img
                                    src={ songDetails.cover_photo } alt={`${ songDetails.song_title } cover photo`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain"
                                    }}
                                />
                            </Box>

                            <Box sx={{ flexGrow: 1}}>
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "24px",
                                        lineHeight: "24px"
                                    }}
                                > { songDetails.song_title } </Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "17px",
                                        lineHeight: "24px",
                                        color: "#CACACA"
                                    }}
                                > { songDetails.artist_name } </Typography>

                                <Stack direction="row" spacing="10px" mt="30px">
                                    <Typography
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: "24px",
                                            lineHeight: "24px",
                                            // letterSpacing: "-1px"
                                            flex: "1 1 200px"
                                        }}
                                    >Label Name</Typography>

                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: "17px",
                                            lineHeight: "24px",
                                            // letterSpacing: "-1px",
                                            flex: "1 1 70%",
                                            color: "#CACACA"
                                        }}
                                    >{ songDetails.label_name } </Typography>
                                </Stack>

                                <Stack direction="row" spacing="10px" mt="20px">

                                    <Typography
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: "24px",
                                            lineHeight: "24px",
                                            // letterSpacing: "-1px"
                                            flex: "1 1 200px"
                                        }}
                                    >Primary Genre</Typography>

                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: "17px",
                                            lineHeight: "24px",
                                            // letterSpacing: "-1px",
                                            flex: "1 1 70%",
                                            color: "#CACACA"
                                        }}
                                    >Dance  </Typography>
                                </Stack>

                                <Stack direction="row" spacing="10px" mt="20px">
                                    <Typography
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: "24px",
                                            lineHeight: "24px",
                                            // letterSpacing: "-1px"
                                            flex: "1 1 200px"
                                        }}
                                    >UPC</Typography>

                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: "17px",
                                            lineHeight: "24px",
                                            // letterSpacing: "-1px",
                                            flex: "1 1 70%",
                                            color: "#CACACA"
                                        }}
                                    > { songDetails.upc_ean } </Typography>
                                </Stack>
                            </Box>
                        </Stack>


                        <Stack mt="50px" width={"60%"} direction={"row"} justifyContent={"space-between"} spacing={"20px"} alignItems={"center"}>
                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: '12px', md: '24px'},
                                        lineHeight: {xs: '8.71px', md: '24px'}
                                    }}
                                >$60,000.00</Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: '10px', md: '17px'},
                                        color: "#797979"
                                    }}
                                >Total Revenue</Typography>
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: '12px', md: '24px'},
                                        lineHeight: {xs: '8.71px', md: '24px'}
                                    }}
                                >80,000,000</Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: '10px', md: '17px'},
                                        color: "#797979"
                                    }}
                                >Streams</Typography>
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: '12px', md: '24px'},
                                        lineHeight: {xs: '8.71px', md: '24px'}
                                    }}
                                >120hrs</Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: '10px', md: '17px'},
                                        color: "#797979"
                                    }}
                                >Stream time</Typography>
                            </Box>
                        </Stack>
                    </Box>


                    <Box sx={{ display: {xs: "initial", sm: "none"} }}>

                        <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                            <IconButton 
                                onClick={() => navigate(-1)}
                                sx={{ color: darkTheme ? "#fff" : "#000" }}
                            >
                                <ChevronLeftIcon />
                            </IconButton>

                            <Box>
                                <FormControl fullWidth sx={{ width: "fit-content" }}>
                                    <Select
                                        labelId="sortByDays"
                                        id="sortByDays-select"
                                        label=""
                                        defaultValue="Last 30 Days"
                                        placeholder='Last 30 Days'

                                        sx={{
                                            color: "#fff",
                                            borderRadius: "8px",
                                            bgcolor: darkTheme ? "#272727" : "#414141",
                                            // textAlign: "center",
                                            fontWeight: "900",
                                            border: "none",
                                            fontSize: {xs: "10px", md: "20px"},
                                            lineHeight: {xs: "12px", md: "24px"},
                                            letterSpacing: {xs: "-0.67px", md: "-1.34px"},

                                            '& .MuiSelect-select': {
                                                p: "5px 14px"
                                            },

                                            '.MuiOutlinedInput-notchedOutline': {
                                                border: "none",
                                                // borderColor: '#fff',
                                                p: 0
                                            },
                                            // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            //     borderColor: '#fff',
                                            // },
                                            // '&:hover .MuiOutlinedInput-notchedOutline': {
                                            //     borderColor: '#fff',
                                            // },
                                            '.MuiSvgIcon-root ': {
                                                fill: "#797979",
                                            }
                                        }}
                                    >
                                        <MenuItem value="Last 30 Days">
                                            Last 7 Days
                                        </MenuItem>
                                        <MenuItem value="Last 30 Days">
                                            Last 14 Days
                                        </MenuItem>
                                        <MenuItem value="Last 30 Days">
                                            Last 30 Days
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Stack>

                        <Typography
                            sx={{
                                fontWeight: "900",
                                fontSize: "33.76px",
                                lineHeight: "16.21px",
                                mt: 3
                            }}
                        > Sensami </Typography>

                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: "16.88px",
                                lineHeight: "4.05px",
                                color: "#797979",
                                mt: 2
                            }}
                        > Album </Typography>

                        <Box
                            sx={{
                                maxHeight: "230px",
                                width: "100%",
                                borderRadius: "8px",
                                overflow: "hidden",
                                mt: 3
                            }}
                        >
                            <img
                                src={ albumSampleArtImg } alt='album image'
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain"
                                }}
                            />
                        </Box>

                        <Stack mt="20px" direction={"row"} justifyContent={"space-between"} spacing={"20px"} alignItems={"center"}>
                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "17.8px",
                                        lineHeight: "17.8px"
                                    }}
                                >$60,000.00</Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: '10px', md: '17px'},
                                        color: "#797979"
                                    }}
                                >Total Revenue</Typography>
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "17.8px",
                                        lineHeight: "17.8px"
                                    }}
                                >80,000,000</Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: '10px', md: '17px'},
                                        color: "#797979"
                                    }}
                                >Streams</Typography>
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "17.8px",
                                        lineHeight: "17.8px"
                                    }}
                                >120hrs</Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: '10px', md: '17px'},
                                        color: "#797979"
                                    }}
                                >Stream time</Typography>
                            </Box>
                        </Stack>

                        <Box
                            sx={{
                                p: darkTheme ? 0 : '15px',
                                bgcolor: darkTheme ? 'none' : "#272727",
                                borderRadius: "12px",
                                color: "#fff",
                                mt: "10px"
                            }}
                        >

                            <Stack direction="row" spacing="10px">
                                <Box sx={{ flex: "1 1 45%" }}>
                                    <Typography
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: "15.43px",
                                            lineHeight: "15.43px",
                                        }}
                                    >Sensami</Typography>

                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: "10.93px",
                                            lineHeight: "7.71px",
                                            color: "#CACACA"
                                        }}
                                    >Joseph solomon </Typography>
                                </Box>

                                <Box sx={{ flex: "1 1 45%" }} >
                                    <Stack direction="row" spacing="10px">
                                        <AppleSportifyCheckmark dspName="Apple" />
                                        <AppleSportifyCheckmark dspName="Spotify" />
                                    </Stack>
                                </Box>
                            </Stack>


                            <Stack direction="row" spacing="10px" mt="20px">
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "15.43px",
                                        lineHeight: "15.43px",
                                        // letterSpacing: "-1px"
                                        flex: "1 1 45%"
                                    }}
                                >Label Name</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "10.93px",
                                        lineHeight: "15.43px",
                                        // letterSpacing: "-1px",
                                        flex: "1 1 45%",
                                        color: "#CACACA"
                                    }}
                                >More Grace Music </Typography>
                            </Stack>

                            <Stack direction="row" spacing="10px" mt="10px">

                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "15.43px",
                                        lineHeight: "15.43px",
                                        // letterSpacing: "-1px"
                                        flex: "1 1 45%"
                                    }}
                                >Primary Genre</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "10.93px",
                                        lineHeight: "15.43px",
                                        // letterSpacing: "-1px",
                                        flex: "1 1 45%",
                                        color: "#CACACA"
                                    }}
                                >Dance  </Typography>
                            </Stack>

                            <Stack direction="row" spacing="10px" mt="10px">
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "15.43px",
                                        lineHeight: "15.43px",
                                        // letterSpacing: "-1px"
                                        flex: "1 1 45%"
                                    }}
                                >UPC</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "10.93px",
                                        lineHeight: "15.43px",
                                        // letterSpacing: "-1px",
                                        flex: "1 1 45%",
                                        color: "#CACACA"
                                    }}
                                >123456789</Typography>
                            </Stack>

                        </Box>

                    </Box>



                    <Box mt={10}>
                        <Box 
                            sx={{
                                // width: {xs: "124.48px", md: "218.06px"},
                                height: {xs: "35px", md: "40px"}
                            }}
                        >
                            <img
                                src={ darkTheme ? appleMusiclogo : appleMusicLightlogo } alt='album image'
                                style={{
                                    // width: "100%",
                                    height: "100%",
                                    objectFit: "contain"
                                }}
                            />
                        </Box>
                        
                        <Box
                            sx={{
                                background: "#64498640",
                                backdropFilter: "blur(12.5px)",
                                WebkitBackdropFilter: "blur(12.5px)",
                                borderRadius: {xs: "13.43px", md: "37px"},
                                height: {xs: "117.98px", md: "127px"},

                                display: "flex",
                                flexDirection: "column",
                                p: {xs: "15px", md: "50px"},
                                mt: 3
                            }}
                        >
                            <Stack mt="auto" direction={"row"} justifyContent={"space-between"} spacing={"20px"} alignItems={"center"}>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: '12px', md: '24px'},
                                            lineHeight: {xs: '8.71px', md: '24px'}
                                        }}
                                    >$60,000.00</Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: '10px', md: '17px'},
                                            color: "#797979"
                                        }}
                                    >Total Revenue</Typography>
                                </Box>

                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: '12px', md: '24px'},
                                            lineHeight: {xs: '8.71px', md: '24px'}
                                        }}
                                    >80,000,000</Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: '10px', md: '17px'},
                                            color: "#797979"
                                        }}
                                    >Streams</Typography>
                                </Box>

                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: '12px', md: '24px'},
                                            lineHeight: {xs: '8.71px', md: '24px'}
                                        }}
                                    >120hrs</Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: '10px', md: '17px'},
                                            color: "#797979"
                                        }}
                                    >Stream time</Typography>
                                </Box>
                            </Stack>
                        </Box>

                        <Box my={5}>
                            <BarChart
                                dataset={dataset}
                                series={[{ dataKey: 'percentageValue', color: "#644986" }]}

                                yAxis={[{disableLine: true, disableTicks: true,  }]}
                                xAxis={[
                                    { 
                                        scaleType: 'band', 
                                        dataKey: 'month', 
                                        disableLine: true,
                                        disableTicks: true,
                                    },
                                ]}
                                sx={{
                                    [`& .${axisClasses.directionY} .${axisClasses.tickLabel}`]: {
                                        // transform: 'translateX(-10px)',
                                        display: "none",
                                    },

                                    [`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
                                        // transform: 'rotateZ(-45deg)',
                                        fontWeight: "400",
                                        fontSize: {xs: "7.66px !important", sm: "12px !important", md: "20.88px !important"},
                                        lineHeight: {xs: "9.27px", md: "25.27px"},
                                        fill: darkTheme ? "#fff" : "#000",
                                    },
                                }}

                                // loading={true}
                                slotProps={{
                                    // Custom loading message
                                    loadingOverlay: { message: 'Loading data...' },
                                    // Custom message for empty chart
                                    noDataOverlay: { message: 'No data to display.' },
                                }}
                                height={ mdDevice ? 400 : smDevice ? 300 : 200 }
                                margin={{right: 0, left: 0, top: 0}}
                                borderRadius={5}
                            />
                        </Box>

                        <Grid container my={5} spacing="20px">
                            <Grid item xs={12} sm={6} md={4}>
                                <Box
                                    sx={{
                                        border: darkTheme ? "1.08px solid #fff" : "1.08px solid #000",
                                        borderRadius: "10.8px",
                                        p: "15px"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: {xs: '', md: '11.38px'},
                                            lineHeight: {xs: '', md: "12.97px"},
                                            letterSpacing: {xs: '', md: '0.36px'}
                                        }}
                                    >Top Cities</Typography>


                                    <Box my={2}>
                                        <Typography
                                            sx={{
                                                fontWeight: '300',
                                                fontSize: '10px',
                                                lineHeight: "6.48px",
                                                letterSpacing: '0.36px',
                                                mb: 0.7
                                            }}
                                        >Abuja</Typography>

                                        <Stack direction="row" alignItems="center" spacing={1} >
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress variant="determinate" value={72.8}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                                            backgroundColor: darkTheme ? "#fff" : "#c4c4c4",
                                                        },
                                                        [`& .${linearProgressClasses.bar}`]: {
                                                            borderRadius: 5,
                                                            backgroundColor: "#C89FF5"
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                }}
                                            >72.8%</Typography>
                                        </Stack>
                                    </Box>

                                    <Box my={2}>
                                        <Typography
                                            sx={{
                                                fontWeight: '300',
                                                fontSize: '10px',
                                                lineHeight: "6.48px",
                                                letterSpacing: '0.36px',
                                                mb: 0.7
                                            }}
                                        >Enugu</Typography>

                                        <Stack direction="row" alignItems="center" spacing={1} >
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress variant="determinate" value={21.2}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                                            backgroundColor: darkTheme ? "#fff" : "#c4c4c4",
                                                        },
                                                        [`& .${linearProgressClasses.bar}`]: {
                                                            borderRadius: 5,
                                                            backgroundColor: "#C89FF5"
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                }}
                                            >21.2%</Typography>
                                        </Stack>
                                    </Box>

                                    <Box my={2}>
                                        <Typography
                                            sx={{
                                                fontWeight: '300',
                                                fontSize: '10px',
                                                lineHeight: "6.48px",
                                                letterSpacing: '0.36px',
                                                mb: 0.7
                                            }}
                                        >Lagos</Typography>

                                        <Stack direction="row" alignItems="center" spacing={1} >
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress variant="determinate" value={57.2}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                                            backgroundColor: darkTheme ? "#fff" : "#c4c4c4",
                                                        },
                                                        [`& .${linearProgressClasses.bar}`]: {
                                                            borderRadius: 5,
                                                            backgroundColor: "#C89FF5"
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                }}
                                            >57.2%</Typography>
                                        </Stack>
                                    </Box>

                                    <Box mt={2}>
                                        <Typography
                                            sx={{
                                                fontWeight: '300',
                                                fontSize: '10px',
                                                lineHeight: "6.48px",
                                                letterSpacing: '0.36px',
                                                mb: 0.7
                                            }}
                                        >Port Harcourt</Typography>

                                        <Stack direction="row" alignItems="center" spacing={1} >
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress variant="determinate" value={40}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                                            backgroundColor: darkTheme ? "#fff" : "#c4c4c4",
                                                        },
                                                        [`& .${linearProgressClasses.bar}`]: {
                                                            borderRadius: 5,
                                                            backgroundColor: "#C89FF5"
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                }}
                                            >40.0%</Typography>
                                        </Stack>
                                    </Box>

                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                        
                                <Box
                                    sx={{
                                        border: darkTheme ? "1.08px solid #fff" : "1.08px solid #000",
                                        borderRadius: "10.8px",
                                        p: "15px"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: {xs: '', md: '11.38px'},
                                            lineHeight: {xs: '', md: "12.97px"},
                                            letterSpacing: {xs: '', md: '0.36px'},
                                            // mb: 1
                                        }}
                                    >Top Countries</Typography>


                                    <Box my={2}>
                                        <Typography
                                            sx={{
                                                fontWeight: '300',
                                                fontSize: '10px',
                                                lineHeight: "6.48px",
                                                letterSpacing: '0.36px',
                                                mb: 0.7
                                            }}
                                        >Nigeria</Typography>

                                        <Stack direction="row" alignItems="center" spacing={1} >
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress variant="determinate" value={72.8}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                                            backgroundColor: darkTheme ? "#fff" : "#c4c4c4",
                                                        },
                                                        [`& .${linearProgressClasses.bar}`]: {
                                                            borderRadius: 5,
                                                            backgroundColor: "#C89FF5"
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                }}
                                            >72.8%</Typography>
                                        </Stack>
                                    </Box>

                                    <Box my={2}>
                                        <Typography
                                            sx={{
                                                fontWeight: '300',
                                                fontSize: '10px',
                                                lineHeight: "6.48px",
                                                letterSpacing: '0.36px',
                                                mb: 0.7
                                            }}
                                        >United kingdom</Typography>

                                        <Stack direction="row" alignItems="center" spacing={1} >
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress variant="determinate" value={21.2}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                                            backgroundColor: darkTheme ? "#fff" : "#c4c4c4",
                                                        },
                                                        [`& .${linearProgressClasses.bar}`]: {
                                                            borderRadius: 5,
                                                            backgroundColor: "#C89FF5"
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                }}
                                            >21.2%</Typography>
                                        </Stack>
                                    </Box>

                                    <Box my={2}>
                                        <Typography
                                            sx={{
                                                fontWeight: '300',
                                                fontSize: '10px',
                                                lineHeight: "6.48px",
                                                letterSpacing: '0.36px',
                                                mb: 0.7
                                            }}
                                        >United States</Typography>

                                        <Stack direction="row" alignItems="center" spacing={1} >
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress variant="determinate" value={57.2}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                                            backgroundColor: darkTheme ? "#fff" : "#c4c4c4",
                                                        },
                                                        [`& .${linearProgressClasses.bar}`]: {
                                                            borderRadius: 5,
                                                            backgroundColor: "#C89FF5"
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                }}
                                            >57.2%</Typography>
                                        </Stack>
                                    </Box>

                                    <Box mt={2}>
                                        <Typography
                                            sx={{
                                                fontWeight: '300',
                                                fontSize: '10px',
                                                lineHeight: "6.48px",
                                                letterSpacing: '0.36px',
                                                mb: 0.7
                                            }}
                                        >South Africa</Typography>

                                        <Stack direction="row" alignItems="center" spacing={1} >
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress variant="determinate" value={40}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                                            backgroundColor: darkTheme ? "#fff" : "#c4c4c4",
                                                        },
                                                        [`& .${linearProgressClasses.bar}`]: {
                                                            borderRadius: 5,
                                                            backgroundColor: "#C89FF5"
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                }}
                                            >40.0%</Typography>
                                        </Stack>
                                    </Box>

                                </Box>

                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <Box
                                    sx={{
                                        border: darkTheme ? "1.08px solid #fff" : "1.08px solid #000",
                                        borderRadius: "10.8px",
                                        p: "15px",
                                        height: "100%"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: {xs: '', md: '11.38px'},
                                            lineHeight: {xs: '', md: "12.97px"},
                                            letterSpacing: {xs: '', md: '0.36px'}
                                        }}
                                    >Top Gender</Typography>

                                    <Stack direction="row" justifyContent="space-evenly" alignItems="center">
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10.8px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px"
                                                }}
                                            >72.2%</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "300",
                                                    fontSize: "7.02px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                    mt:1
                                                }}
                                            >
                                                Women 
                                                <CircleIcon 
                                                    sx={{
                                                        fontSize: "7.02px",
                                                        ml: "5px"
                                                    }}
                                                />
                                            </Typography>
                                        </Box>

                                        <PieChart
                                            series={[
                                                {
                                                    data: [
                                                        { value: 27.8 },
                                                        { value: 72.2 }, 
                                                    ],
                                                    innerRadius: 40,
                                                    outerRadius: 50,

                                                    // paddingAngle: 0,
                                                    // cornerRadius: 0,
                                                    startAngle: 0,
                                                    endAngle: 360,
                                                    // cx: 30,
                                                    // cy: 100,
                                                }
                                            ]}
                                            sx={{
                                                " .MuiPieArc-root": {
                                                    stroke: "none"
                                                },
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                            height={125}
                                            width={1}
                                            // margin={{right: 5}}
                                            colors={ darkTheme ? ['#C89FF5', 'white'] : ['#C89FF5', '#343434'] }
                                        />

                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10.8px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px"
                                                }}
                                            >27.8%</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "300",
                                                    fontSize: "7.02px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                    mt:1
                                                }}
                                            >
                                                Men 
                                                <CircleIcon 
                                                    sx={{
                                                        fontSize: "7.02px",
                                                        color: "#C89FF5",
                                                        ml: "5px"
                                                    }}
                                                />
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box mt={20}>
                        <Box sx={{ height: "35px" }}>
                            <img
                                src={ darkTheme ? spotifylogo : spotifyLghtThemelogo } alt='album image'
                                style={{
                                    // width: "100%",
                                    height: "100%",
                                    objectFit: "contain"
                                }}
                            />
                        </Box>
                        
                        <Box
                            sx={{
                                background: "#64498640",
                                backdropFilter: "blur(12.5px)",
                                WebkitBackdropFilter: "blur(12.5px)",
                                borderRadius: {xs: "13.43px", md: "37px"},
                                height: {xs: "117.98px", md: "127px"},

                                display: "flex",
                                flexDirection: "column",
                                p: {xs: "15px", md: "50px"},
                                mt: 3
                            }}
                        >
                            <Stack mt="auto" direction={"row"} justifyContent={"space-between"} spacing={"20px"} alignItems={"center"}>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: '12px', md: '24px'},
                                            lineHeight: {xs: '8.71px', md: '24px'}
                                        }}
                                    >$60,000.00</Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: '10px', md: '17px'},
                                            color: "#797979"
                                        }}
                                    >Total Revenue</Typography>
                                </Box>

                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: '12px', md: '24px'},
                                            lineHeight: {xs: '8.71px', md: '24px'}
                                        }}
                                    >80,000,000</Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: '10px', md: '17px'},
                                            color: "#797979"
                                        }}
                                    >Streams</Typography>
                                </Box>

                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: '12px', md: '24px'},
                                            lineHeight: {xs: '8.71px', md: '24px'}
                                        }}
                                    >120hrs</Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: '10px', md: '17px'},
                                            color: "#797979"
                                        }}
                                    >Stream time</Typography>
                                </Box>
                            </Stack>
                        </Box>

                        <Box my={5}>
                            <BarChart
                                dataset={dataset}
                                series={[{ dataKey: 'percentageValue', color: "#644986" }]}

                                yAxis={[{disableLine: true, disableTicks: true,  }]}
                                xAxis={[
                                    { 
                                        scaleType: 'band', 
                                        dataKey: 'month', 
                                        disableLine: true,
                                        disableTicks: true,
                                    },
                                ]}
                                sx={{
                                    [`& .${axisClasses.directionY} .${axisClasses.tickLabel}`]: {
                                        // transform: 'translateX(-10px)',
                                        display: "none",
                                    },

                                    [`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
                                        // transform: 'rotateZ(-45deg)',
                                        fontWeight: "400",
                                        fontSize: {xs: "7.66px !important", sm: "12px !important", md: "20.88px !important"},
                                        lineHeight: {xs: "9.27px", md: "25.27px"},
                                        fill: darkTheme ? "#fff" : "#000",
                                    },
                                }}

                                // loading={true}
                                slotProps={{
                                    // Custom loading message
                                    loadingOverlay: { message: 'Loading data...' },
                                    // Custom message for empty chart
                                    noDataOverlay: { message: 'No data to display.' },
                                }}
                                height={ mdDevice ? 400 : smDevice ? 300 : 200 }
                                margin={{right: 0, left: 0, top: 0}}
                                borderRadius={5}
                            />
                        </Box>

                        <Grid container my={5} spacing="20px">
                            <Grid item xs={12} sm={6} md={4}>
                                <Box
                                    sx={{
                                        border: darkTheme ? "1.08px solid #fff" : "1.08px solid #000",
                                        borderRadius: "10.8px",
                                        p: "15px"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: {xs: '', md: '11.38px'},
                                            lineHeight: {xs: '', md: "12.97px"},
                                            letterSpacing: {xs: '', md: '0.36px'}
                                        }}
                                    >Top Cities</Typography>


                                    <Box my={2}>
                                        <Typography
                                            sx={{
                                                fontWeight: '300',
                                                fontSize: '10px',
                                                lineHeight: "6.48px",
                                                letterSpacing: '0.36px',
                                                mb: 0.7
                                            }}
                                        >Abuja</Typography>

                                        <Stack direction="row" alignItems="center" spacing={1} >
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress variant="determinate" value={72.8}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                                            backgroundColor: darkTheme ? "#fff" : "#c4c4c4",
                                                        },
                                                        [`& .${linearProgressClasses.bar}`]: {
                                                            borderRadius: 5,
                                                            backgroundColor: "#C89FF5"
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                }}
                                            >72.8%</Typography>
                                        </Stack>
                                    </Box>

                                    <Box my={2}>
                                        <Typography
                                            sx={{
                                                fontWeight: '300',
                                                fontSize: '10px',
                                                lineHeight: "6.48px",
                                                letterSpacing: '0.36px',
                                                mb: 0.7
                                            }}
                                        >Enugu</Typography>

                                        <Stack direction="row" alignItems="center" spacing={1} >
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress variant="determinate" value={21.2}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                                            backgroundColor: darkTheme ? "#fff" : "#c4c4c4",
                                                        },
                                                        [`& .${linearProgressClasses.bar}`]: {
                                                            borderRadius: 5,
                                                            backgroundColor: "#C89FF5"
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                }}
                                            >21.2%</Typography>
                                        </Stack>
                                    </Box>

                                    <Box my={2}>
                                        <Typography
                                            sx={{
                                                fontWeight: '300',
                                                fontSize: '10px',
                                                lineHeight: "6.48px",
                                                letterSpacing: '0.36px',
                                                mb: 0.7
                                            }}
                                        >Lagos</Typography>

                                        <Stack direction="row" alignItems="center" spacing={1} >
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress variant="determinate" value={57.2}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                                            backgroundColor: darkTheme ? "#fff" : "#c4c4c4",
                                                        },
                                                        [`& .${linearProgressClasses.bar}`]: {
                                                            borderRadius: 5,
                                                            backgroundColor: "#C89FF5"
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                }}
                                            >57.2%</Typography>
                                        </Stack>
                                    </Box>

                                    <Box mt={2}>
                                        <Typography
                                            sx={{
                                                fontWeight: '300',
                                                fontSize: '10px',
                                                lineHeight: "6.48px",
                                                letterSpacing: '0.36px',
                                                mb: 0.7
                                            }}
                                        >Port Harcourt</Typography>

                                        <Stack direction="row" alignItems="center" spacing={1} >
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress variant="determinate" value={40}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                                            backgroundColor: darkTheme ? "#fff" : "#c4c4c4",
                                                        },
                                                        [`& .${linearProgressClasses.bar}`]: {
                                                            borderRadius: 5,
                                                            backgroundColor: "#C89FF5"
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                }}
                                            >40.0%</Typography>
                                        </Stack>
                                    </Box>

                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                        
                                <Box
                                    sx={{
                                        border: darkTheme ? "1.08px solid #fff" : "1.08px solid #000",
                                        borderRadius: "10.8px",
                                        p: "15px"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: {xs: '', md: '11.38px'},
                                            lineHeight: {xs: '', md: "12.97px"},
                                            letterSpacing: {xs: '', md: '0.36px'},
                                            // mb: 1
                                        }}
                                    >Top Countries</Typography>


                                    <Box my={2}>
                                        <Typography
                                            sx={{
                                                fontWeight: '300',
                                                fontSize: '10px',
                                                lineHeight: "6.48px",
                                                letterSpacing: '0.36px',
                                                mb: 0.7
                                            }}
                                        >Nigeria</Typography>

                                        <Stack direction="row" alignItems="center" spacing={1} >
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress variant="determinate" value={72.8}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                                            backgroundColor: darkTheme ? "#fff" : "#c4c4c4",
                                                        },
                                                        [`& .${linearProgressClasses.bar}`]: {
                                                            borderRadius: 5,
                                                            backgroundColor: "#C89FF5"
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                }}
                                            >72.8%</Typography>
                                        </Stack>
                                    </Box>

                                    <Box my={2}>
                                        <Typography
                                            sx={{
                                                fontWeight: '300',
                                                fontSize: '10px',
                                                lineHeight: "6.48px",
                                                letterSpacing: '0.36px',
                                                mb: 0.7
                                            }}
                                        >United kingdom</Typography>

                                        <Stack direction="row" alignItems="center" spacing={1} >
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress variant="determinate" value={21.2}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                                            backgroundColor: darkTheme ? "#fff" : "#c4c4c4",
                                                        },
                                                        [`& .${linearProgressClasses.bar}`]: {
                                                            borderRadius: 5,
                                                            backgroundColor: "#C89FF5"
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                }}
                                            >21.2%</Typography>
                                        </Stack>
                                    </Box>

                                    <Box my={2}>
                                        <Typography
                                            sx={{
                                                fontWeight: '300',
                                                fontSize: '10px',
                                                lineHeight: "6.48px",
                                                letterSpacing: '0.36px',
                                                mb: 0.7
                                            }}
                                        >United States</Typography>

                                        <Stack direction="row" alignItems="center" spacing={1} >
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress variant="determinate" value={57.2}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                                            backgroundColor: darkTheme ? "#fff" : "#c4c4c4",
                                                        },
                                                        [`& .${linearProgressClasses.bar}`]: {
                                                            borderRadius: 5,
                                                            backgroundColor: "#C89FF5"
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                }}
                                            >57.2%</Typography>
                                        </Stack>
                                    </Box>

                                    <Box mt={2}>
                                        <Typography
                                            sx={{
                                                fontWeight: '300',
                                                fontSize: '10px',
                                                lineHeight: "6.48px",
                                                letterSpacing: '0.36px',
                                                mb: 0.7
                                            }}
                                        >South Africa</Typography>

                                        <Stack direction="row" alignItems="center" spacing={1} >
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress variant="determinate" value={40}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                                            backgroundColor: darkTheme ? "#fff" : "#c4c4c4",
                                                        },
                                                        [`& .${linearProgressClasses.bar}`]: {
                                                            borderRadius: 5,
                                                            backgroundColor: "#C89FF5"
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                }}
                                            >40.0%</Typography>
                                        </Stack>
                                    </Box>

                                </Box>

                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <Box
                                    sx={{
                                        border: darkTheme ? "1.08px solid #fff" : "1.08px solid #000",
                                        borderRadius: "10.8px",
                                        p: "15px",
                                        height: "100%"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: {xs: '', md: '11.38px'},
                                            lineHeight: {xs: '', md: "12.97px"},
                                            letterSpacing: {xs: '', md: '0.36px'}
                                        }}
                                    >Top Gender</Typography>

                                    <Stack direction="row" justifyContent="space-evenly" alignItems="center">
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10.8px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px"
                                                }}
                                            >72.2%</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "300",
                                                    fontSize: "7.02px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                    mt:1
                                                }}
                                            >
                                                Women 
                                                <CircleIcon 
                                                    sx={{
                                                        fontSize: "7.02px",
                                                        ml: "5px"
                                                    }}
                                                />
                                            </Typography>
                                        </Box>

                                        <PieChart
                                            series={[
                                                {
                                                    data: [
                                                        { value: 27.8 },
                                                        { value: 72.2 }, 
                                                    ],
                                                    innerRadius: 40,
                                                    outerRadius: 50,

                                                    // paddingAngle: 0,
                                                    // cornerRadius: 0,
                                                    startAngle: 0,
                                                    endAngle: 360,
                                                    // cx: 30,
                                                    // cy: 100,
                                                }
                                            ]}
                                            sx={{
                                                " .MuiPieArc-root": {
                                                    stroke: "none"
                                                },
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                            height={125}
                                            width={1}
                                            // margin={{right: 5}}
                                            colors={ darkTheme ? ['#C89FF5', 'white'] : ['#C89FF5', '#343434'] }
                                        />

                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "10.8px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px"
                                                }}
                                            >27.8%</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "300",
                                                    fontSize: "7.02px",
                                                    lineHeight: "6.48px",
                                                    letterSpacing: "0.36px",
                                                    mt:1
                                                }}
                                            >
                                                Men 
                                                <CircleIcon 
                                                    sx={{
                                                        fontSize: "7.02px",
                                                        color: "#C89FF5",
                                                        ml: "5px"
                                                    }}
                                                />
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                </Box>
            </Box>

        </AccountWrapper>
    )
}

export default SongDetails;
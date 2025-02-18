const config = {
    redis: {
        app: {
            // url: "redis://localhost:6379",

            // Production
            url: "redis://10.101.26.8:6379",
            auth_pass: "PbsProd2022",
            
            // UAT
            // url: "redis://10.106.135.185:6379",
            // auth_pass: "PbsProd2022",
        },
        admin: {
            // url: "redis://localhost:6379",

            // Production
            url: "redis://10.101.26.8:6379",
            auth_pass: "PbsProd2022",
            
            // UAT
            // url: "redis://10.106.135.185:6379",
            // auth_pass: "PbsProd2022",
        },
        dev: {
            url: "redis://localhost:6379",
            // auth_pass: "Emma123"
        },
        uat: {
            url: "redis://192.168.5.37:6379",
            auth_pass: "PbsNdp2021"
        },
        prod: {
            url: "redis://192.168.5.45:6379",
            auth_pass: "PbsNdp2021"
        }
    }
};

export default config;
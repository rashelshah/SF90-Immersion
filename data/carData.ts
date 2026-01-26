export const CAR_DATA = {
    modelName: "SF90 STRADALE",
    price: "€625,000",
    specs: {
        engine: "V8 Hybrid",
        power: "1000 CV",
        acceleration: "0–100 km/h in 2.5s",
        drive: "AWD"
    },
    hybridSystem: {
        totalPower: "1000 CV",
        enginePower: "780 CV",
        electricPower: "220 CV",
        battery: {
            capacity: "7.9 kWh",
            cooling: "Liquid Cooled",
            placement: "Low Center of Gravity"
        },
        motors: {
            frontLeft: {
                name: "Front Left Motor",
                power: "73 kW",
                description: "Independent torque vectoring for enhanced agility and cornering precision"
            },
            frontRight: {
                name: "Front Right Motor",
                power: "73 kW",
                description: "Independent torque vectoring for enhanced agility and cornering precision"
            },
            rear: {
                name: "Rear Motor (MGU-K)",
                power: "120 kW",
                description: "Integrated with the gearbox, providing instant torque fill and energy recovery"
            }
        },
        driveModes: {
            eDrive: {
                name: "eDrive",
                color: "#00D4FF",
                description: "Pure electric mode for zero-emission driving up to 25 km. Front motors provide silent AWD performance."
            },
            hybrid: {
                name: "Hybrid",
                color: "#00FF88",
                description: "Intelligent power management balances V8 and electric motors for optimal efficiency and performance."
            },
            performance: {
                name: "Performance",
                color: "#FFB800",
                description: "Maximum combined output with aggressive energy deployment. Battery maintains charge for consistent power."
            },
            qualify: {
                name: "Qualify",
                color: "#FF0000",
                description: "Full 1000 CV unleashed. Maximum electric boost for ultimate lap time performance."
            }
        },
        eRange: "25 km",
        architecture: "Plug-in Hybrid with AWD Torque Vectoring"
    }
};

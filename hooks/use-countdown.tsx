import React from "react";
function useCountdown(targetDate: Date) {
    const [timeLeft, setTimeLeft] = React.useState<{ hours: number, minutes: number, seconds: number }>({
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    // React.useEffect(() => {
    //     const target = new Date(targetDate).getTime();
    //     const update = () => {
    //         const now = Date.now();
    //         const diff = Math.max(0, target - now);
    //         setTimeLeft({
    //             hours: Math.floor(diff / (1000 * 60 * 60)),
    //             minutes: Math.floor((diff / (1000 * 60)) % 60),
    //             seconds: Math.floor((diff / 1000) % 60),
    //         });
    //     };
    //     update();
    //     const interval = setInterval(update, 1000);
    //     return () => clearInterval(interval);
    // }, [targetDate]);
    return timeLeft;
}

export { useCountdown }
export const getRouteInfo = async (
    startLat,
    startLng,
    endLat,
    endLng
) => {

    try {

        const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=false`
        );

        const data = await response.json();

        if (data.routes.length === 0) {
            return null;
        }

        const route = data.routes[0];

        return {

            distance:
                (route.distance / 1000).toFixed(2),

            duration:
                Math.ceil(route.duration / 60)

        };

    } catch (error) {

        console.log(error);

        return null;

    }

};
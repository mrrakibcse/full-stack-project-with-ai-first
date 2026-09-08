import app from "./app";
import config from "./config/env";

const bootstrap = async () => {
    try {
        app.listen(config.port, () => {
            console.log(`Server is running on http://localhost:${config.port}`);
        });
    } catch (error) {
        console.error(error);
    }
};

bootstrap();
import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;

@RequiredArgsConstructor
public class CloudinaryTest {
    private final Cloudinary cloudinary;

    @Test
    public void uploadFile() {
        cloudinary.uploader().upload();
    }
}

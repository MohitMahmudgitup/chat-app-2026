import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
  PixelRatio,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// ─── Helpers ────────────────────────────────────────────────
const { width, height } = Dimensions.get('window');

// Simple responsive scale functions (you can extract to utils later)
const scale = (size: number) => (width / 375) * size;     // 375 ≈ iPhone 12/13/14 base
const verticalScale = (size: number) => (height / 812) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const fontScale = PixelRatio.getFontScale();

export default function NotFound() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions(); // re-renders on rotation

  const isTabletLike = windowWidth >= 600;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text
        style={[
          styles.emoji,
          { fontSize: moderateScale(80, 0.4) },
        ]}
      >
        😵‍💫
      </Text>

      <Text style={styles.title}>404</Text>
      <Text style={styles.subtitle}>Page not found</Text>

      <Text style={styles.message}>
        The page you're looking for doesn't exist or has been moved.
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          isTabletLike && { minWidth: 280, maxWidth: 360 },
        ]}
        onPress={() => router.replace('/')}
        activeOpacity={0.75}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backLink}
        hitSlop={{ top: 12, bottom: 12, left: 20, right: 20 }}
      >
        <Text style={styles.backLinkText}>← Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(24),
    gap: verticalScale(16), // better vertical spacing control
  },

  emoji: {
    marginBottom: verticalScale(12),
  },

  title: {
    fontSize: moderateScale(72),
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: verticalScale(4),
    includeFontPadding: false, // cleaner on Android
  },

  subtitle: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    color: '#333',
    marginBottom: verticalScale(12),
  },

  message: {
    fontSize: moderateScale(16),
    color: '#666',
    textAlign: 'center',
    lineHeight: moderateScale(24),
    marginBottom: verticalScale(36),
    maxWidth: 480, // prevents very long lines on tablets
  },

  button: {
    backgroundColor: '#007AFF',
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(36),
    borderRadius: 12,
    minWidth: scale(200),
    alignItems: 'center',
    // shadow on iOS / elevation on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },

  buttonText: {
    color: 'white',
    fontSize: moderateScale(18),
    fontWeight: '600',
    // respect system font scaling
    // (already automatic in RN, but good practice)
  },

  backLink: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  backLinkText: {
    color: '#007AFF',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
});
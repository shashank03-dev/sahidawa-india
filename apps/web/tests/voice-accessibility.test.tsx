import { renderToStaticMarkup } from "react-dom/server";
import {
    VoiceProcessingPanel,
    VoiceReviewPanel,
    VoiceErrorPanel,
    VoiceResultPanel,
} from "../app/[locale]/voice/VoicePanels";
import { VoiceAudioVisualizer } from "../app/[locale]/voice/VoiceAudioVisualizer";

describe("Voice Triage Accessibility Semantics", () => {
    it("renders VoiceProcessingPanel with correct role, live properties, and motion-reduction features", () => {
        const markup = renderToStaticMarkup(
            <VoiceProcessingPanel
                title="Checking symptoms"
                subtitle="Analyzing with SahiDawa AI..."
            />
        );

        // Semantics
        expect(markup).toContain('role="status"');
        expect(markup).toContain('aria-live="polite"');
        expect(markup).toContain('aria-label="Checking symptoms"');

        // Motion reduction utilities
        expect(markup).toContain("motion-reduce:animate-none");
    });

    it("renders VoiceReviewPanel with focus rings, motion reduction, and correct ARIA structures", () => {
        const markup = renderToStaticMarkup(
            <VoiceReviewPanel
                title="Please review your transcript"
                message="The microphone picked up low confidence audio."
                transcript="I have cold and headache"
                confidence={{ id: "low", score: 0.2, tone: "critical" }}
                confidenceLabelPrefix="Confidence"
                confidenceValueLabel="Low"
                retryLabel="Try Again"
                analyseLabel="Analyse Anyway"
                onRetry={() => undefined}
                onAnalyse={() => undefined}
                emergencyTitle="Urgent Care Needed"
                emergencyBody="Please seek clinical attention"
                showEmergency={true}
            />
        );

        expect(markup).toContain("motion-reduce:animate-none");
        expect(markup).toContain("Urgent Care Needed");

        // Focus state indicators
        expect(markup).toContain("focus-visible:ring-2");
        expect(markup).toContain("focus-visible:ring-slate-500");
        expect(markup).toContain("focus-visible:ring-emerald-500");
    });

    it("renders VoiceErrorPanel with retry focus styles and motion-reduction", () => {
        const markup = renderToStaticMarkup(
            <VoiceErrorPanel
                error={{
                    title: "Access Denied",
                    message: "Microphone blocked",
                    isRecoverable: true,
                }}
                retryLabel="Try Again"
                onRetry={() => undefined}
            />
        );

        expect(markup).toContain("motion-reduce:animate-none");
        expect(markup).toContain("Access Denied");
        expect(markup).toContain("focus-visible:ring-2");
        expect(markup).toContain("focus-visible:ring-slate-950");
    });

    it("renders VoiceResultPanel with robust focus states, region role, and labels", () => {
        const markup = renderToStaticMarkup(
            <VoiceResultPanel
                heading="AI Triage Result"
                subheading="Clinical Assessment"
                transcriptLabel="Transcript"
                transcript="I have high fever"
                confidence={{ id: "high", score: 0.95, tone: "positive" }}
                confidenceLabelPrefix="Confidence"
                confidenceValueLabel="High"
                result={{
                    summary: "Fever needs monitoring.",
                    recommendations: ["Rest well", "Drink water"],
                    emergency: false,
                    disclaimer: "Informational use only.",
                }}
                emergencyTitle="Urgent Care"
                emergencyBody="Seek help"
                recommendationsLabel="Recommended Actions"
                shareLabel="Share"
                speakLabel="Read Aloud"
                stopSpeakingLabel="Stop"
                tryAgainLabel="New Check"
                isSpeaking={false}
                onReplay={() => undefined}
                onStopSpeaking={() => undefined}
                onShare={() => undefined}
                onTryAgain={() => undefined}
            />
        );

        // Regional landmark
        expect(markup).toContain('role="region"');
        expect(markup).toContain('aria-labelledby="voice-ai-analysis-heading"');

        // Button focus indicators
        expect(markup).toContain("focus-visible:ring-2");
        expect(markup).toContain("focus-visible:ring-slate-500");
        expect(markup).toContain("focus-visible:ring-blue-500");
        expect(markup).toContain("focus-visible:ring-slate-950");
    });

    it("renders VoiceAudioVisualizer volume progressbar with correct roles and attributes", () => {
        const markup = renderToStaticMarkup(
            <VoiceAudioVisualizer
                stream={null}
                isActive={true}
                isFading={false}
                animationsEnabled={false}
                visualizerLabel="Audio Wave"
                volumeLabel="Volume"
                liveVolumeLabel="Live"
                stillVolumeLabel="Still"
                visualizerUnavailableLabel="Wave unavailable"
            />
        );

        // Progress bar semantics
        expect(markup).toContain('role="progressbar"');
        expect(markup).toContain('aria-label="Volume"');
        expect(markup).toContain('aria-valuemin="0"');
        expect(markup).toContain('aria-valuemax="100"');

        // Default valuenow for showCanvas=false
        expect(markup).toContain('aria-valuenow="18"');
    });
});

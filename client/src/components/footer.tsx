import { Search, ExternalLink, FileText, Shield, Info, Image } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-white/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Search className="text-white h-5 w-5" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                PromptLang
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Discover, analyze, and test the best prompts for your AI projects. 
              A minimalist platform to explore the world of effective prompts.
            </p>
          </div>

          {/* About Us */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Info className="h-4 w-4" />
              About Us
            </h3>
            <div className="space-y-3 text-sm text-slate-600">
              <p>
                PromptLang is a platform dedicated to discovering and sharing 
                quality prompts for AI models.
              </p>
              <p>
                Our mission is to facilitate access to the best practices 
                in prompt engineering for all users.
              </p>
              <div className="pt-2">
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                >
                  Learn more
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documentation
            </h3>
            <div className="space-y-3 text-sm text-slate-600">
              <div>
                <h4 className="font-medium text-slate-800 mb-1">How to use the app</h4>
                <p>Search for prompts by keywords, categories or objectives.</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800 mb-1">Test prompts</h4>
                <p>Use our integrated testing interface with OpenAI and Claude.</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800 mb-1">Admin management</h4>
                <p>Add, edit and import prompts in bulk via JSON.</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800 mb-1">Recent generations</h4>
                <p>View the latest images created by our community.</p>
              </div>
              <div className="pt-2 flex flex-col space-y-2">
                <a 
                  href="/docs" 
                  className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                >
                  Complete guide
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a 
                  href="/recent-generations" 
                  className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                >
                  <Image className="h-3 w-3" />
                  Recent generations
                </a>
              </div>
            </div>
          </div>

          {/* Terms & Policy */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Legal
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <a 
                  href="#" 
                  className="text-slate-600 hover:text-blue-600 transition-colors block"
                >
                  Terms of Service
                </a>
                <p className="text-xs text-slate-500 mt-1">
                  Platform usage rules and conditions
                </p>
              </div>
              <div>
                <a 
                  href="#" 
                  className="text-slate-600 hover:text-blue-600 transition-colors block"
                >
                  Privacy Policy
                </a>
                <p className="text-xs text-slate-500 mt-1">
                  Data protection and processing
                </p>
              </div>
              <div>
                <a 
                  href="#" 
                  className="text-slate-600 hover:text-blue-600 transition-colors block"
                >
                  Legal Notice
                </a>
                <p className="text-xs text-slate-500 mt-1">
                  Legal information and contact
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © 2025 PromptLang. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-slate-500">
              <span>Powered by OpenAI & Claude</span>
              <span>•</span>
              <span>Version 1.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}